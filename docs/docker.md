1. **What is Docker?**
   - Docker is a technology that allows you to package your application and its dependencies into a single, lightweight unit called a "container."

2. **Why Use Containers?**
   - Containers are like little self-contained packages for your applications. They include everything your app needs to run, such as the code, libraries, and settings. This means you can run your application consistently across different environments, like your local computer, a testing server, or a production server.

3. **Key Terms:**
   - **Image:** An image is a blueprint for a container. It contains all the necessary files, libraries, and configurations to run your application.
   - **Container:** A running instance of an image. It's like an isolated environment for your application to run in.
   - **Dockerfile:** A text file that describes how to build a Docker image. It specifies what needs to be included in the image.

4. **How Docker Works:**
   - Docker uses a client-server architecture. The Docker client communicates with the Docker server, which does the heavy lifting.

5. **Getting Started with Docker:**
   - To get started with Docker, you typically follow these steps:
     a. **Install Docker:** You need to install Docker on your computer. You can download it from the Docker website.
     b. **Create a Dockerfile:** This is a simple text file that describes how to set up your application.
     c. **Build an Image:** Use the Dockerfile to build an image. This image will include your app and its dependencies.
     d. **Run a Container:** Start a container from your image. Your app will run inside this container.

6. **Benefits of Docker:**
   - **Portability:** Containers can run consistently across different environments, which helps with development and deployment.
   - **Isolation:** Containers are isolated from each other and from the host system, ensuring that one app doesn't interfere with another.
   - **Resource Efficiency:** Containers are lightweight and share the host OS kernel, making them efficient in terms of resource usage.
   - **Scaling:** Docker makes it easy to scale your application by running multiple containers of the same image.

7. **Use Cases:**
   - Docker is widely used for web application deployment, microservices, and continuous integration/continuous deployment (CI/CD) pipelines.

8. **Docker Ecosystem:**
   - Docker Hub: A registry for Docker images where you can find and share pre-built images.
   - Docker Compose: A tool for defining and running multi-container applications.
   - Kubernetes: A container orchestration platform that can manage Docker containers at scale.

# Kubernetes (K8s)

1. **What is Kubernetes?**
   - Kubernetes (often abbreviated as K8s) is an open-source platform that automates the deployment, scaling, and management of containerized applications. It was originally developed by Google and is now maintained by the Cloud Native Computing Foundation (CNCF).

2. **Why Use Kubernetes?**
   - Kubernetes is used to manage containers, which are like lightweight, isolated units for running applications. It's particularly useful when you have many containers and need to ensure they run reliably, efficiently, and at scale.

3. **Key Terms:**
   - **Cluster:** A Kubernetes cluster is a group of machines (physical or virtual) that run containerized applications. It includes a master node (control plane) and worker nodes (where containers run).
   - **Pod:** The smallest deployable unit in Kubernetes. A pod can contain one or more containers and shares the same network namespace.
   - **Deployment:** A resource in Kubernetes that defines how an application should run and how many replicas should be maintained.
   - **Service:** A way to expose your application to the network, often providing load balancing and DNS for pods.
   - **Node:** A physical or virtual machine within the cluster where containers are scheduled to run.

4. **How Kubernetes Works:**
   - Kubernetes automates many tasks, such as distributing containers across nodes, ensuring they are healthy, scaling them up or down as needed, and managing networking between containers.

5. **Getting Started with Kubernetes:**
   - To use Kubernetes, you typically follow these steps:
     a. **Set up a Cluster:** You need to create a Kubernetes cluster, which involves configuring master and worker nodes. You can set up a cluster on your own servers or use a cloud provider's managed Kubernetes service.
     b. **Create Deployments:** Define what applications you want to run and how many replicas of each application you need.
     c. **Use Services:** Expose your applications to the outside world or to other pods within the cluster.
     d. **Monitor and Scale:** Kubernetes provides tools for monitoring your applications and scaling them up or down as needed.

6. **Benefits of Kubernetes:**
   - **Scalability:** Kubernetes makes it easy to scale your applications up or down, depending on the demand.
   - **High Availability:** It ensures that your applications are highly available by distributing them across multiple nodes.
   - **Self-healing:** If a container or node fails, Kubernetes can automatically replace it with a healthy one.
   - **Declarative Configuration:** You describe how your application should run, and Kubernetes takes care of making it happen.

7. **Use Cases:**
   - Kubernetes is commonly used for deploying and managing microservices, web applications, and any containerized workloads. It's especially useful in large, complex environments where many containers need to work together.

8. **Kubernetes Ecosystem:**
   - **Kubectl:** The command-line tool for interacting with a Kubernetes cluster.
   - **Helm:** A package manager for Kubernetes that simplifies deploying and managing applications.
   - **Prometheus:** A popular monitoring and alerting tool used with Kubernetes.
   - **Ingress Controllers:** These manage external access to services within the cluster.

# How to build a docker image for our kctm app
1. Visit [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) and select your operating system in the dropdown menu.
You can also check the mannual on how to install it using the command line
2. You can create a new minimal app, use your kctm app or your blog api app.
    i. create a Dockerfile in the root of your project directory and paste the following content
    ```Dockerfile
    FROM node:14

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD ["npm", "run", "start"]
    ```

    
Now, let's break down each line of this Dockerfile for a our application:

1. `FROM node:latest`
   - This line specifies the base image as an official Node.js latest image. It's the foundation for your Node.js application.

2. `WORKDIR /app`
   - This sets the working directory within the container to `/app`. You'll place your application code and run commands in this directory.

3. `COPY package*.json ./`
   - This line copies your `package.json` and `package-lock.json` files from your local directory to the container's working directory. This step is crucial for installing your application's dependencies.

4. `RUN npm install`
   - It runs `npm install` to install your application's dependencies listed in `package.json` within the container.

5. `COPY . .`
   - This copies the rest of your application code, including your `src/index.js` file and any other files or directories, into the container's working directory.

6. `EXPOSE 3000`
   - This line exposes port 3000 in the container, which is where your Node.js application might be listening. It doesn't automatically expose the port to the host; you'd do that when running the container.

7. `CMD ["npm", "run", "start]`
   - This is the command that gets executed when you run the container. In this case, it starts your Node.js application using the `start` script in the package.json file. You can customize this command to match your application's entry point.

After creating this Dockerfile, you can build the Docker image and run your Node.js application in a container by using the following commands:

To build the image:
```bash
docker build -t docker-hub-username/app-name:tag .
```

List containers
```bash
docker container ls
```

To run the container, mapping port 3000 in the container to port 4000 on your host machine:
```bash
docker run -dp 4000:3000 my-node-app
```

Now, your Node.js application is running in a Docker container, and you can access it at `http://localhost:4000`.

Run the following docker ps command in a terminal to list your running containers.

```bash
docker ps
```

Push to docker hub
```bash
docker push docker-hub-username/app-name:tag
```