pipeline {
    agent any

    environment {
        APP_NAME = 'student-feedback-devops-app'
        DOCKER_IMAGE = 'student-feedback-devops-app:latest'
        STAGING_CONTAINER = 'student-feedback-staging'
        PRODUCTION_CONTAINER = 'student-feedback-production'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub repository...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'

                echo 'Building Docker image as deployable artefact...'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated Jest and Supertest tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality analysis...'
                bat 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit security scan...'
                bat 'npm run security'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to staging Docker container...'
                bat 'docker rm -f %STAGING_CONTAINER% || exit 0'
                bat 'docker run -d --name %STAGING_CONTAINER% -p 3001:3000 %DOCKER_IMAGE%'
                bat 'curl http://localhost:3001/health'
            }
        }

        stage('Release') {
            steps {
                echo 'Promoting application to production Docker container...'
                bat 'docker rm -f %PRODUCTION_CONTAINER% || exit 0'
                bat 'docker run -d --name %PRODUCTION_CONTAINER% -p 3002:3000 %DOCKER_IMAGE%'
                bat 'curl http://localhost:3002/health'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring production application health and logs...'
                bat 'curl http://localhost:3002/health'
                bat 'docker logs %PRODUCTION_CONTAINER%'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully with all seven DevOps stages.'
        }

        failure {
            echo 'Pipeline failed. Review the failed stage output.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}