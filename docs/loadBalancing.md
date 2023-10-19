> Reminder: VMs

# Load balancing

**Load Balancing**:

Load balancing is the process of efficiently distributing incoming network traffic, such as web requests or data queries, among multiple backend servers or resources. It is typically achieved through a load balancer, which acts as an intermediary between clients (e.g., users' web browsers) and the servers that host the application or service. The load balancer makes decisions about where to route each incoming request based on various algorithms and server health checks.

**Usefulness of Load Balancing**:

1. **Improved Performance**: Load balancing ensures that no single server is overwhelmed with traffic. Instead, incoming requests are distributed evenly, reducing response times and preventing server congestion. This results in a faster and more responsive application.

2. **Enhanced Reliability**: Load balancers can perform health checks on backend servers to determine their status. If a server becomes unavailable or experiences issues, the load balancer can automatically route traffic to healthy servers, effectively providing fault tolerance. This enhances the overall reliability and availability of the application.

3. **Scalability**: Load balancing plays a vital role in scaling an application horizontally. As the user base or traffic increases, you can add more servers to the pool and have the load balancer distribute the load. This scalability allows your application to handle more users and maintain performance.

4. **Session Persistence**: Load balancers can be configured to maintain session persistence, also known as sticky sessions. This ensures that a user's requests are consistently routed to the same server for the duration of their session, which is essential for certain applications.

5. **Security**: Load balancers can provide a level of security by hiding the internal server structure from external users. This adds a layer of protection against direct attacks on specific servers.

6. **Optimized Resource Utilization**: Load balancing helps maximize resource utilization. It ensures that all servers are actively handling requests, avoiding situations where some servers are idle while others are overloaded.

7. **Geo-distribution**: For applications with a global user base, load balancers can route traffic to servers in different geographic locations, reducing latency and ensuring a better user experience for users around the world.

## Nginx

Nginx (pronounced "engine-x") is a popular and high-performance open-source web server, reverse proxy server, and load balancer. It's known for its speed, efficiency, and versatility, making it a widely used tool in the field of web server technology. Nginx is particularly valued for its ability to handle a large number of concurrent connections and efficiently serve static content and reverse proxy dynamic content to backend application servers. Here's a more in-depth explanation of what Nginx is and its key features:

1. **Web Server**: Nginx can function as a standalone web server. It is designed to serve web content, such as HTML, CSS, JavaScript, and images, to clients, like web browsers. Nginx is highly efficient at serving static content and can handle a large number of simultaneous client connections with minimal resource usage.

2. **Reverse Proxy Server**: Nginx can act as a reverse proxy server, forwarding client requests to backend servers. This is especially valuable in a microservices architecture or when you have multiple application servers handling dynamic content. Nginx can distribute requests to these servers, improving the efficiency and scalability of your application.

3. **Load Balancer**: Nginx can function as a load balancer, distributing incoming network traffic across multiple backend servers. It uses various load-balancing algorithms to ensure even distribution, enhance performance, and provide redundancy in case one server fails.

4. **TLS/SSL Termination**: Nginx can handle SSL/TLS encryption and decryption, relieving backend servers from this resource-intensive task. It's often used as a TLS/SSL termination point in the architecture, offloading the cryptographic work from the application servers.

5. **Caching**: Nginx includes caching capabilities, allowing you to cache content at the server level. This can significantly improve response times for frequently requested resources and reduce the load on backend servers.

6. **Reverse Proxy for APIs**: Nginx is commonly used to proxy requests to APIs, making it a valuable component for building RESTful APIs or microservices-based applications.

7. **HTTP and HTTPS Support**: Nginx supports both HTTP and HTTPS (secure HTTP) protocols, making it suitable for serving web applications securely over the internet.

8. **Configuration Flexibility**: Nginx offers a robust and highly configurable configuration file, allowing administrators to tailor its behavior to specific requirements. This flexibility is one of its strengths.

9. **Open Source**: Nginx is open source, which means it is free to use and has an active community of developers who contribute to its development and provide support.

## Nginx configuration file

Our NGINX configuration file is divided into different sections, each with its specific purpose. Let's go through it line by line:

```nginx
http {
```

1. `http {`: This line starts the `http` block. In NGINX, the `http` block is the top-level configuration block for HTTP-related settings. It contains global settings for the HTTP server, including how to handle incoming requests and where to route them.

```nginx
    upstream backend {
        server localhost:3000;
        server localhost:4000;
    }
```

2. `upstream backend {`: This defines an upstream group named "backend." An upstream group is a set of backend servers that NGINX can proxy requests to. In this case, it defines two backend servers running on `localhost` and listening on ports 3000 and 4000. Requests to this "backend" group will be load-balanced between these two servers.

```nginx
    server {
        listen 80;
```

3. `server {`: This line starts a server block. A server block is used to define the settings for a particular virtual host or website. In this case, it specifies the configuration for requests to port 80.

4. `listen 80;`: This line specifies that the server should listen on port 80. Port 80 is the default HTTP port, and incoming HTTP requests to this server will be processed.

```nginx
        root /home/vagrant/projects/server-root;
```

5. `root /home/vagrant/projects/server-root;`: This line sets the document root for the server. The `root` directive specifies the directory where NGINX will look for web content. In this case, it's set to `/home/vagrant/projects/server-root`, meaning that NGINX will serve files from this directory when handling requests.

```nginx
        location / {
```

6. `location / {`: This line defines a location block within the server block. Location blocks allow you to specify how NGINX should handle requests that match a particular URL path or pattern. In this case, the location block matches requests to the root of the website (e.g., `http://your-server/`).

```nginx
            proxy_pass http://backend;
        }
    }
}
```

7. `proxy_pass http://backend;`: This line is part of the location block and specifies that requests matching the location should be proxied to the "backend" upstream group defined earlier. It load-balances the requests between the two backend servers on `localhost:3000` and `localhost:4000`.

```nginx
events { }
```

8. `events { }`: This section is empty in the provided configuration. The `events` block is typically used to configure settings related to how NGINX handles system events, such as the number of worker processes and connections. An empty `events` block means that the default settings will be used.

In review, this NGINX configuration sets up a basic HTTP server that listens on port 80. Requests to the root of the website are proxied to two backend servers (Node.js, for example) running on `localhost` on ports 3000 and 4000. The web content is served from the `/home/vagrant/projects/server-root` directory. This configuration enables load balancing between the two backend servers, helping distribute the incoming requests for better performance and redundancy.
