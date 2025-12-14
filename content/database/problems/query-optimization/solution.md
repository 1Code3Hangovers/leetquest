# Query Optimization

## Problem
Optimize slow database queries for better performance.

## Common Issues & Solutions

### 1. Missing Indexes
**Problem:** Full table scans on large tables
```sql
-- Slow: scans entire table
SELECT * FROM orders WHERE customer_id = 123;
```

**Solution:** Add index
```sql
CREATE INDEX idx_customer_id ON orders(customer_id);
```

### 2. SELECT * Anti-pattern
**Problem:** Fetching unnecessary columns
```sql
-- Slow: retrieves all columns
SELECT * FROM users WHERE email = 'user@example.com';
```

**Solution:** Select only needed columns
```sql
SELECT id, name, email FROM users WHERE email = 'user@example.com';
```

### 3. N+1 Query Problem
**Problem:** Multiple queries in a loop
```sql
-- Slow: N+1 queries
SELECT * FROM orders; -- 1 query
For each order:
  SELECT * FROM customers WHERE id = order.customer_id; -- N queries
```

**Solution:** Use JOIN
```sql
SELECT orders.*, customers.name 
FROM orders 
JOIN customers ON orders.customer_id = customers.id;
```

### 4. Inefficient JOINs
**Problem:** Joining on non-indexed columns
```sql
-- Slow
SELECT * FROM orders o
JOIN customers c ON o.customer_email = c.email;
```

**Solution:** Join on indexed foreign keys
```sql
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id;
```

## Performance Testing
```sql
-- Use EXPLAIN to analyze query plan
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE customer_id = 123;
```
