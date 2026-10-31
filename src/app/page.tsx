"use client";
import BtnUp from "@/components/BtnUp";
import { Header } from "@/components/Header";
import Presentation from "@/components/Presentation";
import Experience from "@/components/Experience";
import Proyectos from "@/components/Proyectos";
import Repos from "@/components/Repos";
import Stack from "@/components/Stack";
import { useAppSelector } from "@/redux/hook";


export default function Home() {
  const theme = useAppSelector((state) => state.themeReducer.mode);
  return (
    <main className={theme}>
      <Header />
      <Presentation />
      <Experience />
      <Proyectos />
      <Repos />
      <Stack />
      <BtnUp/>
    </main>
  );
}
