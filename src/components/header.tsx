import React from "react"

export default function Header() {
  return (
    <header className="absolute z-10 w-full p-16">
      <div className="flex items-center justify-between">
        <div className="font-black tracking-wide text-white">CHAIR.</div>
        <nav>
          <ul className="m-0 p-0 flex">
            <li className="list-none mx-20">
              <a className="capitalize text-white no-underline" href="/">
                discover
              </a>
            </li>
            <li className="list-none mx-20">
              <a className="capitalize text-white no-underline" href="/">
                products
              </a>
            </li>
            <li className="list-none mx-20">
              <a className="capitalize text-white no-underline" href="/">
                solutions
              </a>
            </li>
            <li className="list-none mx-20">
              <a className="capitalize text-white no-underline" href="/">
                reach
              </a>
            </li>
            <li className="list-none mx-20">
              <a
                className="capitalize text-white no-underline font-semibold py-4 px-6 rounded-2xl bg-[#23232a]"
                href="/"
              >
                order
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
