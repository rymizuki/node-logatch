# logatch

stdoutに出力されたログをWebからフィルタしたりコピーしたり検索したりできるようにする。

ベータ板なので取り扱いは雑です。

## installation

```
git clone https://github.com/rymizuki/node-logatch.git ~/project/node-logatch
cd node-logatch
npm ci
npm run build

cat 'export PATH="$HOME/project/node-logatch/bin:$PATH"' > ~/{.your_sh_profile}
```

## usage

### basic

start watch and server process:

```
tail -f /var/log/system.log | logatch
```

open your browser:

```
open http://localhost:18085
```

### multiple process

start server process:

```
logatch
```

recording log pipeline

```
tail -f /var/log/system.log | logatch-rec
```

## configuration

Create configuration file on `~/.logatch.config.json` the first time `logatch` or `logatch-rec` is started.

### port

set logatch server port.

### host

set logatch server host.
