🚀 CloudCart – CI/CD Deployment with Kubernetes
CloudCart is a microservices-based eCommerce backend application deployed using a complete DevOps CI/CD pipeline.
This project demonstrates containerization, automated deployment, and Kubernetes orchestration in a real-world setup.

🧱 Tech Stack
Node.js & Express
PostgreSQL
Docker
Docker Hub
Jenkins (CI/CD)
GitHub Webhooks
Kubernetes (Minikube)

📦 Microservices
User Service
Product Service
Order Service
Each service runs in its own container and is deployed using Kubernetes Deployments and Services.

⚙️ CI/CD Workflow
Code pushed to GitHub
GitHub Webhook triggers Jenkins
Jenkins builds Docker images
Images pushed to Docker Hub
Kubernetes pulls images and performs rolling updates

Fully automated deployment pipeline 🚀
☸️ Kubernetes Features Used
Deployments
Services
Rolling Updates
imagePullPolicy: Always
Pod Debugging using kubectl describe

🔍 Key Challenges Solved
ErrImageNeverPull
ImagePullBackOff
Docker tag mismatch
Incorrect image naming
Deployment configuration issues

🚀 Future Enhancements
Deploy to AWS EKS
GitOps using ArgoCD
Monitoring with Prometheus & Grafana

👨‍💻 Author
Sahil Kumar
DevOps & Cloud Enthusiast
