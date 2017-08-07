# Send Room Temper

zabbixにbme280から取得した温度を送りたかった

## Getting Started

raspberrypi+bme280が必須。  

```
npm install
HOST=<zabbixの動いてるサーバのIPとか> PORT=<zabbixの動いてるサーバのポート> ZABBIX_HOST=<任意のホスト名> ZABBIX_ITEM_KEY=<任意のアイテムkey> npm start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

