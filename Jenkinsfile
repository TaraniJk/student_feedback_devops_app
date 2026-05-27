pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'student-feedback-devops-app:latest'
        STAGING_CONTAINER = 'student-feedback-staging'
        PRODUCTION_CONTAINER = 'student-feedback-production'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'

                echo 'Building Docker image as deployable artefact...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest and Supertest automated tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality checks...'
                sh 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit security scan...'
                sh 'npm run security'
            }
        }

                stage('Deploy') {
            steps {
                echo 'Deploying to staging environment...'
                sh 'docker rm -f $STAGING_CONTAINER || true'
                sh 'docker run -d --name $STAGING_CONTAINER -p 3001:3000 $DOCKER_IMAGE'
                sh 'sleep 5'
                sh 'curl http://host.docker.internal:3001/health'
            }
        }

        stage('Release') {
            steps {
                echo 'Promoting to production environment...'
                sh 'docker rm -f $PRODUCTION_CONTAINER || true'
                sh 'docker run -d --name $PRODUCTION_CONTAINER -p 3002:3000 $DOCKER_IMAGE'
                sh 'sleep 5'
                sh 'curl http://host.docker.internal:3002/health'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring production application health and logs...'
                sh 'curl http://host.docker.internal:3002/health'
                sh 'docker logs $PRODUCTION_CONTAINER'
            }
        }

        stage('Release') {
            steps {
                echo 'Promoting to production environment...'
                sh 'docker rm -f $PRODUCTION_CONTAINER || true'
                sh 'docker run -d --name $PRODUCTION_CONTAINER -p 3002:3000 $DOCKER_IMAGE'
                sh 'sleep 5'
                sh 'curl http://host.docker.internal:3002/health'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring production application health and logs...'
                sh 'curl http://host.docker.internal:3002/health'
                sh 'docker logs $PRODUCTION_CONTAINER'
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