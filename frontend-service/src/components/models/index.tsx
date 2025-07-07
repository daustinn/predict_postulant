"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IconDatabaseLeak, IconPlus, IconTrash } from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const genders = {
  f: "Femenino",
  m: "Masculino",
};

const range = [1, 2, 3, 4, 5];

export default function Models({
  models,
  generateModel,
}: {
  models: any;
  generateModel: (formData: FormData) => Promise<any>;
}) {
  const [generating, setGenerating] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setGenerating(true);
    try {
      const res = await generateModel(formData);
      console.log(res);
      setOpenDialog(false);
      toast.success("Modelo entrenado exitosamente.", {
        description: (
          <p>
            El modelo <strong>{res.name}</strong> ha sido creado exitosamente.
            Puedes ver los detalles en la lista de modelos.
            <br />
            Precisión del modelo: <strong>{res.precision}</strong>
          </p>
        ),
      });
      router.refresh();
      e.currentTarget?.reset();
    } catch (error) {
      toast.error("Error al generar el modelo. Por favor, intenta nuevamente.");
      console.error("Error al generar el modelo:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col grow">
      <nav className="border-b flex items-center p-3">
        <h2 className="text-base grow tracking-tight font-semibold">Modelos</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <IconPlus />
              Nuevo modelo
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Entrenamiento de modelo de predicción</DialogTitle>
              <DialogDescription>
                Aquí puedes entrenar un nuevo modelo de predicción para evaluar
                postulantes. Asegúrate de proporcionar un nombre único y
                seleccionar el indicador adecuado.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Nombre</Label>
                <Input required name="name" id="name-1" />
              </div>
              <div className="grid gap-3">
                <Label>Indicadores</Label>
                <div className="border-t pt-3 grid gap-3">
                  <div className="">
                    <Label htmlFor="age_from">Género</Label>
                    <div className="pt-2">
                      <Select defaultValue="all" name="gender">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un género" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          {Object.entries(genders).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="age_from">Edad</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Input
                        placeholder="Desde"
                        type="number"
                        required
                        min="0"
                        name="age_from"
                      />
                      <Input
                        min="0"
                        placeholder="Hasta"
                        type="number"
                        name="age_to"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="experience_from">Años de experiencia</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Input
                        placeholder="Desde"
                        required
                        min="0"
                        type="number"
                        name="experience_from"
                      />
                      <Input
                        type="number"
                        min="0"
                        placeholder="Hasta"
                        name="experience_to"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="certificates_from">Certificados</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Input
                        name="certificates_from"
                        required
                        placeholder="Desde"
                        type="number"
                        min="0"
                      />
                      <Input
                        min="0"
                        name="certificates_to"
                        placeholder="Hasta"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="communication_from">Comunicacion</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <SelectComp
                        name="communication_from"
                        required
                        placeholder="Desde"
                      />
                      <SelectComp
                        nullable
                        defaultValue="none"
                        name="communication_to"
                        placeholder="Hasta"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="leadership_from">Liderazgo</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <SelectComp
                        name="leadership_from"
                        required
                        placeholder="Desde"
                      />
                      <SelectComp
                        nullable
                        defaultValue="none"
                        name="leadership_to"
                        placeholder="Hasta"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="teamwork_from">Trabajo en equipo</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <SelectComp
                        name="teamwork_from"
                        required
                        placeholder="Desde"
                      />
                      <SelectComp
                        nullable
                        defaultValue="none"
                        name="teamwork_to"
                        placeholder="Hasta"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="adaptability_from">Adaptabilidad</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <SelectComp
                        name="adaptability_from"
                        required
                        placeholder="Desde"
                      />
                      <SelectComp
                        nullable
                        defaultValue="none"
                        name="adaptability_to"
                        placeholder="Hasta"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="punctuality_from">Puntualidad</Label>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <SelectComp
                        name="punctuality_from"
                        required
                        placeholder="Desde"
                      />
                      <SelectComp
                        nullable
                        defaultValue="none"
                        name="punctuality_to"
                        placeholder="Hasta"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button disabled={generating} type="submit">
                  {generating ? " Entrenando..." : "Entrenar modelo"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </nav>
      <div className="grow">
        <Table className="h-full w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Precision</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model: any) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center px-2 gap-2">
                    <div className="p-1.5 rounded-md dark:bg-blue-500/20 dark:text-blue-400">
                      <IconDatabaseLeak size={20} />
                    </div>
                    {model.name}
                  </div>
                </TableCell>
                <TableCell>{model.model_name}</TableCell>
                <TableCell>{model.precision}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <Button size="sm" variant="destructive">
                      <IconTrash />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export const SelectComp = ({
  name,
  required,
  placeholder,
  defaultValue,
  nullable,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
  nullable?: boolean;
}) => {
  return (
    <Select defaultValue={defaultValue || ""} name={name} required={required}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {nullable && <SelectItem value="none">Ninguno</SelectItem>}
        {range.map((value) => (
          <SelectItem key={value} value={String(value)}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
