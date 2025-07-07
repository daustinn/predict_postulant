/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconChevronDown,
  IconCloudUpload,
  IconFileSpreadsheet,
  IconSparkles,
  IconUserCancel,
  IconUserPlus,
} from "@tabler/icons-react";
import { DatabaseZapIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { genders } from "./models";

const study_levels = [
  "Primaria",
  "Secundaria",
  "Preparatoria",
  "Técnico",
  "Bachillerato",
  "Licenciatura",
  "Maestría",
  "Doctorado",
  "Universitario",
];

export default function HomeComponent({
  models,
  predictCandidate,
  predictCandidates,
}: {
  models: any;
  predictCandidate: (form: object) => Promise<any>;
  predictCandidates: (form: FormData) => Promise<any>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [candidate, setCandidate] = React.useState<any>(null);
  const [predicting, setPredicting] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [model, setModel] = React.useState<string>(
    models[0]?.id ? String(models[0].id) : ""
  );
  const [result, setResult] = React.useState<any>(null);

  const selectedModel = models.find((m: any) => m.id === Number(model));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get("study_level") === "none") {
      return toast.error("Por favor, selecciona un nivel de estudio válido.");
    }
    toast(formData.get("study_level")?.toString());

    setCandidate({
      name: formData.get("name") || null,
      study_level: formData.get("study_level") || null,
      profession: formData.get("profession") || null,
      gender: formData.get("gender") || null,
      age: Number(formData.get("age")) || null,
      experience: Number(formData.get("experience")) || null,
      certificates: Number(formData.get("certificates")) || null,
      communication: Number(formData.get("communication")) || null,
      leadership: Number(formData.get("leadership")) || null,
      teamwork: Number(formData.get("teamwork")) || null,
      adaptability: Number(formData.get("adaptability")) || null,
      punctuality: Number(formData.get("punctuality")) || null,
    });
    console.log(Object.fromEntries(formData.entries()));
    setOpenModal(false);
    toast.success("Candidato agregado exitosamente");
  };

  async function handlePredict() {
    setPredicting(true);
    try {
      if (file) {
        const form = new FormData();
        form.append("file", file);
        form.append("model", String(selectedModel?.id));
        const res = await predictCandidates(form);
        setResult(res);
        setFile(null);
      } else {
        const res = await predictCandidate({
          ...candidate,
          model: selectedModel?.id,
          years_of_experience: candidate.experience,
          gender: candidate.gender === "all" ? null : candidate.gender,
        });
        setResult(res);
      }
    } catch (error) {
      console.error("Error al predecir:", error);
      toast.error("Error al predecir");
    } finally {
      setPredicting(false);
    }
  }

  return (
    <div className="flex flex-col grow">
      <nav className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer tracking-tight flex text-left text-base hover:bg-neutral-500/20 rounded-lg items-center gap-2 p-1 px-2">
              {selectedModel?.name}
              <IconChevronDown
                size={15}
                strokeWidth={3}
                className="opacity-50"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72" align="start">
            <DropdownMenuRadioGroup
              value={model}
              onValueChange={(value) => {
                const model = models.find((m: any) => m.id === Number(value));
                if (!model) {
                  toast.error("Modelo no encontrado");
                  return;
                }
                setModel(String(model.id));
                toast.success(
                  `Modelo seleccionado: ${model ? model.name : "Desconocido"}`
                );
              }}
            >
              {models.map((model: any) => {
                const isNew =
                  new Date(model.created_at) >
                  new Date(Date.now() - 10 * 60 * 1000);
                return (
                  <DropdownMenuRadioItem
                    key={model.id}
                    endContent={
                      isNew && (
                        <span className="inline-block font-medium border dark:border-lime-500/40 dark:bg-lime-500/20 dark:text-lime-400 rounded-full text-xs py-1 px-2">
                          Nuevo
                        </span>
                      )
                    }
                    value={String(model.id)}
                  >
                    <DatabaseZapIcon />
                    <div>
                      <p>{model.name}</p>
                      <p className="text-xs dark:text-neutral-400">
                        {model.model_name}
                      </p>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="grow flex flex-col items-center justify-center p-3 pb-16">
        <nav className="pb-5">
          <h2 className="text-4xl pb-2 font-bold tracking-tight text-center">
            Predecir postulante
          </h2>
          <p className="max-w-[60ch] text-sm dark:text-neutral-400 pt-2 text-center tracking-tight">
            Selecciona un archivo con postulantes o ingresa uno manualmente para
            iniciar el proceso de predicción del éxito laboral.
          </p>
        </nav>
        <div
          data-s={result?.suitable && !!candidate ? "" : undefined}
          data-ns={!result?.suitable && !!candidate ? "" : undefined}
          className="dark:bg-neutral-900 data-[s]:dark:bg-blue-500/20 data-[ns]:dark:bg-red-500/10 flex flex-col max-md:w-full w-[600px] max-w-full rounded-3xl"
        >
          <div className="relative w-full">
            <input
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) setFile(selectedFile);
                else {
                  setFile(null);
                  toast.error("No se seleccionó ningún archivo");
                }
              }}
              accept=".xlsx"
              type="file"
              ref={inputRef}
              className="hidden"
            />
            <button
              onClick={() => {
                inputRef.current?.click();
              }}
              disabled={!!candidate}
              className="shadow-md w-full h-48 disabled:pointer-events-none disabled:dark:bg-[#1c1c1c] disabled:[&>*]:opacity-60 text-base hover:dark:border-neutral-700 pb-5 border rounded-3xl dark:bg-[#363636] hover:dark:bg-[#3d3d3d] flex justify-center grow items-center cursor-pointer dark:text-neutral-400 hover:dark:text-neutral-300"
            >
              {file ? (
                <div className="flex items-center gap-3 text-left">
                  <div className="text-white p-2 rounded-md dark:bg-green-600">
                    <IconFileSpreadsheet size={24} />
                  </div>
                  <p className="max-w-[40ch]">
                    Archivo seleccionado:{" "}
                    <span className="font-semibold dark:text-white">
                      {file.name}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-left">
                  <div className="text-white">
                    <IconCloudUpload size={24} />
                  </div>
                  <p className="max-w-[25ch]">
                    Seleccionar archivo{" "}
                    <span className="font-semibold dark:text-white">.xlsx</span>{" "}
                    con candidatos
                  </p>
                </div>
              )}
            </button>
            <div className="p-2 absolute bottom-0 pointer-events-none inset-x-0 flex items-center gap-1">
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!!file}
                    data-selected={candidate ? "" : undefined}
                    className="rounded-full data-[selected]:dark:border-blue-800 data-[selected]:dark:bg-blue-500/20 data-[selected]:dark:text-blue-400 relative pointer-events-auto"
                  >
                    <IconUserPlus />
                    {candidate ? candidate.name : "Manual"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] pointer-events-auto">
                  <DialogHeader>
                    <DialogTitle>Agregar candidato manualmente</DialogTitle>
                    <DialogDescription>
                      Completa los campos a continuación para seleccionar un
                      nuevo candidato manualmente.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3 col-span-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          defaultValue={candidate?.name ?? ""}
                          required
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="grid gap-3 col-span-2">
                        <Label htmlFor="profession">Profesión</Label>
                        <Input
                          defaultValue={candidate?.profession || ""}
                          required
                          name="profession"
                        />
                      </div>
                      <div className="grid gap-3 col-span-2">
                        <Label htmlFor="study_level">Nivel de estudio</Label>
                        <Select
                          defaultValue={candidate?.study_level}
                          name="study_level"
                          required
                        >
                          <SelectTrigger id="study_level" className="w-full">
                            <SelectValue placeholder="Selecciona un nivel de estudio" />
                          </SelectTrigger>
                          <SelectContent>
                            {study_levels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3 col-span-2">
                        <Label htmlFor="gender">Género</Label>
                        <Select
                          defaultValue={candidate?.gender}
                          name="gender"
                          required
                        >
                          <SelectTrigger id="gender" className="w-full">
                            <SelectValue placeholder="Selecciona un género" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(genders).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="age">Edad</Label>
                        <Input
                          defaultValue={candidate?.age || ""}
                          required
                          min="0"
                          name="age"
                          type="number"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="experience">Años de experiencia</Label>
                        <Input
                          defaultValue={candidate?.experience || ""}
                          required
                          min="0"
                          name="experience"
                          type="number"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="certificates">Certificados</Label>
                        <Input
                          defaultValue={candidate?.certificates}
                          required
                          min="0"
                          name="certificates"
                          type="number"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="communication">Comunicación</Label>
                        <SelectComp
                          defaultValue={candidate?.communication}
                          placeholder="Selecciona un nivel"
                          name="communication"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="leadership">Liderazgo</Label>
                        <SelectComp
                          defaultValue={candidate?.leadership}
                          placeholder="Selecciona un nivel"
                          name="leadership"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="teamwork">Trabajo en equipo</Label>
                        <SelectComp
                          defaultValue={candidate?.teamwork}
                          placeholder="Selecciona un nivel"
                          name="teamwork"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="adaptability">Adaptabilidad</Label>
                        <SelectComp
                          defaultValue={candidate?.adaptability}
                          placeholder="Selecciona un nivel"
                          name="adaptability"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="punctuality">Puntualidad</Label>
                        <SelectComp
                          defaultValue={candidate?.punctuality}
                          placeholder="Selecciona un nivel"
                          name="punctuality"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">
                        {candidate
                          ? "Actualizar candidato"
                          : "Agregar candidato"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full relative pointer-events-auto"
              >
                <IconFileSpreadsheet />
                Plantilla
              </Button>
              <Button
                disabled={(!file && !candidate) || predicting}
                variant="default"
                size="sm"
                onClick={handlePredict}
                className="rounded-full ml-auto relative pointer-events-auto"
              >
                <IconSparkles />
                {predicting ? "Prediciendo..." : "Iniciar"}
              </Button>
            </div>
          </div>
          {result && (
            <div
              data-s={result?.suitable && !!candidate ? "" : undefined}
              data-ns={!result?.suitable && !!candidate ? "" : undefined}
              className="w-full data-[s]:dark:text-blue-400 data-[ns]:dark:text-red-400"
            >
              {!candidate ? (
                <div>
                  <nav className="flex gap-2 p-3 pb-2">
                    <div className="text-xs text-center dark:bg-red-800/30 rounded-lg p-1 px-2 dark:text-red-400">
                      <IconUserCancel className="mx-auto" />
                      <p>{result.unfit} no aptos</p>
                      <p className="pt-1">
                        {(
                          (result.unfit / (result.unfit + result.fit)) *
                          100
                        ).toFixed(2)}
                        %
                      </p>
                    </div>
                    <div className="text-xs text-center dark:bg-green-800/30 rounded-lg p-1 px-2 dark:text-green-400">
                      <IconUserCancel className="mx-auto" />
                      <p>{result.fit} aptos</p>
                      <p className="pt-1">
                        {(
                          (result.fit / (result.unfit + result.fit)) *
                          100
                        ).toFixed(2)}
                        %
                      </p>
                    </div>
                  </nav>
                  <div className="hidden-scroll max-h-[300px] overflow-y-auto">
                    <table className="w-full text-left">
                      <thead className="border-b dark:border-neutral-600/20">
                        <tr className="[&>th]:py-2 [&>th]:px-4 [&>th]:text-xs opacity-50 [&>th]:font-normal">
                          <th>Nombre</th>
                          <th>Nivel</th>
                          <th>Probabilidad</th>
                          <th>Apto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-neutral-600/20">
                        {result.candidates.map((candidate: any, i: number) => {
                          return (
                            <tr
                              key={i}
                              className="[&>td]:py-1.5 [&>td]:px-4 [&>td]:text-sm"
                            >
                              <td>
                                <p className="line-clamp-1">{candidate.name}</p>
                              </td>
                              <td>{candidate.study_level}</td>
                              <td className="text-center">
                                {candidate.probability}%
                              </td>
                              <td className="text-center">
                                {candidate.result === "Suitable" ? "✔️" : "❌"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-5">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                  {/* <p>Nombre: {candidate.name}</p>
                  <p>Probabilidad: {candidate.probability}</p> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const SelectComp = ({
  name,
  required,
  placeholder,
  defaultValue,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
}) => {
  return (
    <Select
      defaultValue={defaultValue ? String(defaultValue) : undefined}
      name={name}
      required={required}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5].map((value) => (
          <SelectItem key={value} value={String(value)}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
