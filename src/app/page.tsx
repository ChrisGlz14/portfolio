'use client'
import {Header} from "@/components/Header";
import Presentation from "@/components/Presentation";
import { useAppSelector } from "@/redux/hook";



export default function Home() {
  const theme = useAppSelector(state => state.themeReducer.mode)
  return (
    <main className={theme}>
      <Header/>
      <Presentation />
    </main>
  );
}
