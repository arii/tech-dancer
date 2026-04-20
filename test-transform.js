import matter from 'gray-matter';
const raw = undefined;
try {
  matter(typeof raw === 'string' ? raw : raw?.default);
} catch (e) {
  console.log("Failed gracefully!");
}
