import Models from "@/components/models";
import { apihost } from "@/const";
import axios from "axios";
import React from "react";

export default async function ModelsPage() {
  const { data: models } = await axios.get(apihost + "models");

  async function generateModel(formData: FormData) {
    "use server";
    const form = Object.fromEntries(formData.entries());
    const json = {
      name: form.name,
      gender: form.gender !== "all" ? form.gender : null,
      age_from: form.age_from ? Number(form.age_from) : null,
      age_to: form.age_to ? Number(form.age_to) : null,
      experience_from: form.experience_from
        ? Number(form.experience_from)
        : null,
      experience_to: form.experience_to ? Number(form.experience_to) : null,
      certificates_from: form.certificates_from
        ? Number(form.certificates_from)
        : null,
      certificates_to: form.certificates_to
        ? Number(form.certificates_to)
        : null,
      communication_from: form.communication_from
        ? Number(form.communication_from)
        : null,
      communication_to:
        form.communication_to !== "none" ? Number(form.communication_to) : null,
      leadership_from: form.leadership_from
        ? Number(form.leadership_from)
        : null,
      leadership_to:
        form.leadership_to !== "none" ? Number(form.leadership_to) : null,
      teamwork_from: form.teamwork_from ? Number(form.teamwork_from) : null,
      teamwork_to:
        form.teamwork_to !== "none" ? Number(form.teamwork_to) : null,
      adaptability_from: form.adaptability_from
        ? Number(form.adaptability_from)
        : null,
      adaptability_to:
        form.adaptability_to !== "none" ? Number(form.adaptability_to) : null,
      punctuality_from: form.punctuality_from
        ? Number(form.punctuality_from)
        : null,
      punctuality_to:
        form.punctuality_to !== "none" ? Number(form.punctuality_to) : null,
    };
    const { data } = await axios.post(apihost + "models", json);
    return data;
  }

  return <Models models={models} generateModel={generateModel} />;
}
