"use client";
import { Header } from "@/components/Header";
import Presentation from "@/components/Presentation";
import Proyectos from "@/components/Proyectos";
import Repos from "@/components/Repos";
import Stack from "@/components/Stack";
import { useAppSelector } from "@/redux/hook";
import CardSkeleton from "./ui/skeletons";
import { Suspense } from "react";

export default function Home() {
  const theme = useAppSelector((state) => state.themeReducer.mode);
  return (
    <main className={theme}>
      <Header />
      <Presentation />
      <Proyectos />
      <Repos />
      <Stack />
    </main>
  );
}
