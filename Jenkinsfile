pipeline {
    agent any

    environment {
        DOCKERHUB = "sahilkr1302"
        IMAGE_TAG = "test"
        KUBECONFIG = "C:\\Users\\91700\\.kube\\config"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t %DOCKERHUB%/user-service:%IMAGE_TAG% user-service"
                bat "docker build -t %DOCKERHUB%/product-service:%IMAGE_TAG% product-service"
                bat "docker build -t %DOCKERHUB%/order-service:%IMAGE_TAG% order-service"
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHub',   
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    bat'''
                    docker login -u %USERNAME% -p %PASSWORD%
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                bat "docker push %DOCKERHUB%/user-service:%IMAGE_TAG%"
                bat "docker push %DOCKERHUB%/product-service:%IMAGE_TAG%"
                bat "docker push %DOCKERHUB%/order-service:%IMAGE_TAG%"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat "kubectl set image deployment/user-service user-service=%DOCKERHUB%/user-service:%IMAGE_TAG%"
                bat "kubectl set image deployment/product-service product-service=%DOCKERHUB%/product-service:%IMAGE_TAG%"
                bat "kubectl set image deployment/order-service order-service=%DOCKERHUB%/order-service:%IMAGE_TAG%"
            }
        }

        stage('Verify Deployment') {
            steps {
                bat "kubectl rollout status deployment/user-service"
                bat "kubectl rollout status deployment/product-service"
                bat "kubectl rollout status deployment/order-service"
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
