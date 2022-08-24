const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const logErr = async (message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', errLog.log), logItem);
  } catch(e) {
    console.log(e);
  }
}

const errHandler = (err, req, res, next) => {
  logErr(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`);

  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
};

module.exports = errHandler;