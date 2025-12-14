# Load Balancing Pattern

## Description
Load balancing distributes network traffic across multiple servers to ensure no single server bears too much demand, improving responsiveness and availability.

## When to Use
- High traffic applications
- Need for horizontal scaling
- Fault tolerance requirements
- Distributing workload across multiple resources

## Types
1. **Round Robin** - Distributes requests sequentially
2. **Least Connections** - Routes to server with fewest active connections
3. **IP Hash** - Routes based on client IP
4. **Weighted Round Robin** - Distributes based on server capacity

## Common Use Cases
- Web servers
- API gateways
- Database read replicas
- Microservices architecture

## Tools & Technologies
- NGINX
- HAProxy
- AWS Elastic Load Balancer
- Azure Load Balancer
