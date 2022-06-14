import { NextPage } from "next";
import Link from "next/link";

interface IProps {
  children: React.ReactNode
}

export default function Layout({ children }: IProps) {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/course"><a>Courses</a></Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>

      <footer>
        footer
      </footer>
    </div>
  )
}