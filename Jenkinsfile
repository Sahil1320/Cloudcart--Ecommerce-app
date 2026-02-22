pipeline {
    agent any

    environment {
        KUBECONFIG = 'C:\\Users\\91700\\.kube\\config'
    }

    stages {

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t user-service:latest user-service'
                bat 'docker build -t product-service:latest product-service'
                bat 'docker build -t order-service:latest order-service'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat 'kubectl rollout restart deployment user-service'
                bat 'kubectl rollout restart deployment product-service'
                bat 'kubectl rollout restart deployment order-service'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl get pods'
            }
        }
    }
}
