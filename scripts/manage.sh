set -e

CMD=$1

case "$CMD" in
  setup)
    docker --version
    git --version
    docker pull python:3.9-alpine
    docker pull node:18-alpine
    ;;
  build)
    COMMIT_HASH=$(git rev-parse --short HEAD || echo "latest")
    docker build -t python-runner:$COMMIT_HASH -t python-runner:latest -f containers/python/Dockerfile .
    docker build -t nodejs-runner:$COMMIT_HASH -t nodejs-runner:latest -f containers/nodejs/Dockerfile .
    docker-compose build
    ;;
  test)
    docker-compose up -d
    sleep 5
    curl -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d '{"language":"python","code":"print(\"Hello World from Python\")"}'
    echo ""
    curl -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d '{"language":"nodejs","code":"console.log(\"Hello World from Nodejs\")"}'
    echo ""
    ;;
  clean)
    docker-compose down -v
    rm -rf temp/*
    docker image prune -f
    ;;
  logs)
    docker-compose logs -f | awk '{
      if ($0 ~ /ERROR|CRITICAL/)
        print "\033[31m" $0 "\033[0m"
      else
        print $0
    }'
    ;;
  *)
    echo "Usage: $0 {setup|build|test|clean|logs}"
    exit 1
esac