import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/v0/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const users = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, users);
            },
            providesTags: (res, err, arg) => {
                return (res.ids ?
                        [{ type: 'User', id: 'LIST' },
                        ...res.ids.map(id => ({ type: 'User', id }))] :
                        [{ type: 'User', id: 'LIST' }]
                    );
            }
        }),

        createNewUser: builder.mutation({
            query: userData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...userData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),

        updateUser: builder.mutation({
            query: userData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...userData,
                }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),

        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
});

export const {
    useGetUsersQuery,
    useCreateNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);