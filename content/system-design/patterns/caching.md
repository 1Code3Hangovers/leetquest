# Caching Pattern

## Description
Caching stores frequently accessed data in fast-access storage to reduce latency and improve system performance.

## When to Use
- Expensive computations or database queries
- Frequently accessed data
- Data that doesn't change often
- Need to reduce backend load

## Cache Strategies
1. **Cache-Aside** - Application manages cache explicitly
2. **Write-Through** - Write to cache and database simultaneously
3. **Write-Back** - Write to cache first, database later
4. **Read-Through** - Cache handles database reads

## Eviction Policies
- LRU (Least Recently Used)
- LFU (Least Frequently Used)
- FIFO (First In First Out)
- TTL (Time To Live)

## Common Technologies
- Redis
- Memcached
- CDN (CloudFlare, CloudFront)
- Browser caching
