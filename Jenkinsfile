node {
    def commit_id
    stage('Preparation'){
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('./git/commit-id').trim()
    }
    stage('test'){
        nodejs(nodeJSInstallationName: 'nodejs'){
            sh 'npm install mocha --only-dev'
            sh 'npm test'
        }
    }
    stage('docker build/push'){
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub'){
            def app = docker.build("hienpham95/node-chat-app:${commit_id}", ".").push()
        }
    }
}