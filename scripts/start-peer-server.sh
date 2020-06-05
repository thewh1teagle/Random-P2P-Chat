if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit 1
fi

docker run -p 9000:9000 -d peerjs/peerjs-server > peer_server.log 2>&1
echo "Server started. server secred id in peer_server.log"
