pipeline {
    agent any

    environment {
        KUBECONFIG = 'C:\\Users\\91700\\.kube\\config'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Docker Images') {
            steps {
                bat "docker build -t user-service:%IMAGE_TAG% user-service"
                bat "docker build -t product-service:%IMAGE_TAG% product-service"
                bat "docker build -t order-service:%IMAGE_TAG% order-service"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat "kubectl set image deployment/user-deployment user-container=user-service:%IMAGE_TAG%"
                bat "kubectl set image deployment/product-deployment product-container=product-service:%IMAGE_TAG%"
                bat "kubectl set image deployment/order-deployment order-container=order-service:%IMAGE_TAG%"
            }
        }

        stage('Verify Deployment') {
            steps {
                bat "kubectl rollout status deployment/user-deployment"
                bat "kubectl rollout status deployment/product-deployment"
                bat "kubectl rollout status deployment/order-deployment"
            }
        }
    }
}
