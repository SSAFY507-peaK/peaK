pipeline {
    agent any

    tools {
        nodejs 'nodejs-16.16.0'
    }

    stages {
        stage('Gradle Build') {
            steps {
                dir("back") {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean build -x test'
                }
            }
        }
        stage('React Build') {
            steps {
                dir("front") {
                    sh 'npm install --force'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Backend Docker Build') {
            steps {
                dir("back") {
                    sh 'docker build -t peak-backend:latest .'
                }
            }
        }
        stage('Frontend Docker Build') {
            steps {
                dir("front") {
                    sh 'docker build -t peak-frontend:latest .'
                }
            }
        }

        stage('Backend Deploy') {
            steps {
                sh 'docker rm -f backend'
                sh 'docker run -d --net host --name backend -p 8093:8080 -u root peak-backend:latest'
            }
        }
        stage('Frontend Deploy') {
            steps {
                sh 'docker rm -f frontend'
                sh 'docker run -d --name frontend -p 3126:3000 -u root peak-frontend:latest'
            }
        }

        stage('Finish') {
            steps {
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }
    }
}