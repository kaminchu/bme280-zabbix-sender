var cron = require('node-cron');

var BME280 = require('node-bme280');
var bme280 = new BME280({ address: 0x76 });

var ZabbixSender = require('node-zabbix-sender');
var Sender = new ZabbixSender({ host: 'zabbix.example.com' });


cron.schedule('* * * * *', function () {

    bme280.begin(function (err) {
        if (err) {
            console.error("bme280 initializing error", err);
            response.writeHead(500);
            return;
        }

        bme280.readPressureAndTemparature(function (err, pressure, temperature, humidity) {

            Sender.addItem('room_temp', temperature).send(function (err, res) {
                if (err) {
                    throw err;
                }

                console.dir(res);
            });
            console.log('running a task every minute');


        });
    });



});

