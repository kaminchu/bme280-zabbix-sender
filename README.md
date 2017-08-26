# Send Room Temper

zabbixにbme280から取得した温度を送りたかった

## Getting Started

raspberrypi+bme280が必須。  
`.env.sample`をコピーして`.env`を作成して、よしなにする。

```
npm install
npm start
```

## Generating Startup Script


```
sudo npm install pm2 -g
pm2 startup ubuntu
```
で表示されるコマンドを実行



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

