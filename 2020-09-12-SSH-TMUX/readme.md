On a server, you want to drop SSH connection and still have app run

nodemon is built for this, and doesn't take any addition effort.

with react, we need to multiplex the terminal session, and leave an extra session up, with the `node` instance running.

```c
// (when SSH'd into a remote machine)
$> sudo tmux
#> npm run start
// (sever starts up)
`CTRL+b`, then `d`
$> exit
```
