# About the project modifications

### installation & run
1. start the server in the `./server` folder
1. start the client (uses custom webpack configuration)
    - go to `./client`
    - npm i
    - npm run start

### building for production (optional)
1. build the client with custom webpack
    - npm run build
1. install "http-server-spa" (what i chose as local server since it handles single page apps for us already)
    - npm install http-server-spa -g
1. serve the built project using "http-server-spa"
    - npm run serve

### Side notes
1. webpack configuration added
    - the original react scripts are still there, didnt remove them in case you'd rather use those, but they're not referenced in package.json
    - 'npm run start' and 'npm run build' use tthe webpack config i made
1. added bootstrap for styling convenience 
    - removed the dependancy on just the bootstrap grid since now we had the whole thing
    - used said grid instead of some hard-coded sizes
1. removed deprecated react lifecycle functions
1. refactored some code and tried respecting DRY coding principle
