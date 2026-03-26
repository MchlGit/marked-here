## Client Setup


```bash
# Install dependencies
npm install

# Copy the example env file and fill in your values
cp .env.example .env
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running tests

```bash
npm test
```

---

## 📁 Project Structure

```
src/
├── api/            # fetches from server side
├── assets/         # Page-level components / routes
├── components/     # reusable React components
├── lib/         
├── mocks/          # Mock API to test separate from server
├── pages/          # UI pages
├── test/           # general testing configs 
└── types/          # reflects models as received from server side
```

---