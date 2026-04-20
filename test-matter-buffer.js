import matter from 'gray-matter';
import { Buffer } from 'buffer';

console.log(matter(Buffer.from("---\ntitle: hello\n---\nworld")));
