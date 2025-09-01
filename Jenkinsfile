pipeline {
    agent any
    environment {
        NODE_OPTIONS = '--max_old_space_size=4096'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                script {
                    if (fileExists('package-lock.json')) {
                        bat 'npm ci'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Archive build') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
