/* eslint-disable @typescript-eslint/no-explicit-any */
import { apihost } from "@/const";
import axios from "axios";
import { UsersIcon } from "lucide-react";
import React from "react";

export default async function DashboardsPage() {
  const { data } = await axios.get(apihost + "dashboard");
  // const data = {
  //   models: 1,
  //   analized: 39,
  //   latest: [
  //     {
  //       name: "Zaira Iniesta Arcos",
  //       profession: "Educación Inicial",
  //       gender: "f",
  //       years_of_experience: 29,
  //       communication: 5,
  //       teamwork: 1,
  //       punctuality: 4,
  //       suitable: 0,
  //       updated_at: null,
  //       id: 24,
  //       study_level: "Universitario",
  //       age: 64,
  //       certificates: 1,
  //       leadership: 4,
  //       adaptability: 1,
  //       probability: 0.04,
  //       created_at: "2025-07-07T15:52:47",
  //     },
  //     {
  //       name: "Rafa Guijarro-Sacristán",
  //       profession: "Agronomía",
  //       gender: "m",
  //       years_of_experience: 11,
  //       communication: 5,
  //       teamwork: 5,
  //       punctuality: 4,
  //       suitable: 0,
  //       updated_at: null,
  //       id: 54,
  //       study_level: "Técnico",
  //       age: 32,
  //       certificates: 4,
  //       leadership: 4,
  //       adaptability: 3,
  //       probability: 12.28,
  //       created_at: "2025-07-07T15:52:47",
  //     },
  //     {
  //       name: "Rómulo Carnero Ayuso",
  //       profession: "Diseño Gráfico",
  //       gender: "m",
  //       years_of_experience: 18,
  //       communication: 4,
  //       teamwork: 4,
  //       punctuality: 3,
  //       suitable: 1,
  //       updated_at: null,
  //       id: 22,
  //       study_level: "Técnico",
  //       age: 49,
  //       certificates: 4,
  //       leadership: 5,
  //       adaptability: 5,
  //       probability: 51.72,
  //       created_at: "2025-07-07T15:52:47",
  //     },
  //   ],
  //   fit_candidates: 3,
  //   unfit_candidates: 36,
  // };
  return (
    <div className="">
      <nav className="py-2 px-3 border-b">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </nav>
      <div className="p-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card
          count={data.models}
          title="Modelos"
          title2="Entrenados"
          description="Cantidad de modelos entrenados y disponibles para hacer predicciones."
        />

        <Card
          count={data.analized}
          title="Candidatos"
          title2="Analizados"
          description="Cantidad de candidatos analizados por los modelos."
        />

        <Card
          count={data.fit_candidates}
          title="Candidatos aptos"
          title2="Aptos"
          description="Cantidad de candidatos que cumplen con los requisitos del modelo."
        />
        <Card
          count={data.unfit_candidates}
          title="Candidatos no aptos"
          title2="No Aptos"
          description="Cantidad de candidatos que no cumplen con los requisitos del modelo."
        />
      </div>
      <div className="p-5">
        <h2 className="pb-3 text-lg font-semibold flex items-center">
          <UsersIcon className="inline-block mr-2" />
          Últimos Candidatos
        </h2>
        <div className="border dark:border-neutral-500/30 shadow-md dark:bg-neutral-900 rounded-xl overflow-hidden">
          <table data-slot="table" className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b bg-muted sticky top-0 z-10">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  Candidato
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  Profesión
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  Nivel de estudio
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  <div className="w-full text-right">Probabilidad</div>
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  <div className="w-full text-right">Apto</div>
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"
                  colSpan={1}
                >
                  Modelo
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0 **:data-[slot=table-cell]:first:w-8">
              {data.latest.map((candidate: any, i: number) => {
                return (
                  <tr
                    key={i}
                    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors [&>td]:py-2.5 [&>td]:px-4 [&>td]:text-sm [&>td]:align-middle [&>td]:whitespace-nowrap"
                  >
                    <td>{candidate.name}</td>
                    <td>{candidate.profession}</td>
                    <td>{candidate.study_level}</td>
                    <td className="text-right">{candidate.probability}%</td>
                    <td className="text-right">
                      {candidate.suitable ? "✔️" : "❌"}
                    </td>
                    <td>{candidate.model ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const Card = ({
  count,
  description,
  title,
  title2,
}: {
  title: string;
  title2: string;
  description: string;
  count: number;
}) => {
  return (
    <div
      data-slot="card"
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm @container/card"
    >
      <div
        data-slot="card-header"
        className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
      >
        <div
          data-slot="card-description"
          className="text-muted-foreground text-sm"
        >
          {title}
        </div>
        <div
          data-slot="card-title"
          className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >
          {count}
        </div>
        <div
          data-slot="card-action"
          className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
        >
          <span
            data-slot="badge"
            className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="tabler-icon tabler-icon-trending-up "
            >
              <path d="M3 17l6 -6l4 4l8 -8"></path>
              <path d="M14 7l7 0l0 7"></path>
            </svg>
            +12.5%
          </span>
        </div>
      </div>
      <div
        data-slot="card-footer"
        className="flex px-6 [.border-t]:pt-6 flex-col items-start gap-1.5 text-sm"
      >
        <div className="line-clamp-1 flex gap-2 font-medium">
          {title2}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="tabler-icon tabler-icon-trending-up size-4"
          >
            <path d="M3 17l6 -6l4 4l8 -8"></path>
            <path d="M14 7l7 0l0 7"></path>
          </svg>
        </div>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
