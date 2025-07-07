import HomeComponent from "@/components/home";
import { apihost } from "@/const";
import axios from "axios";
import React from "react";
export default async function Home() {
  const { data } = await axios.get(apihost + "models");

  async function predictCandidate(form: object) {
    "use server";

    console.log(form);
    const { data } = await axios.post(apihost + "predictions", form);
    return data;
  }

  async function predictCandidates(form: FormData) {
    "use server";
    const { data } = await axios.post(apihost + "predictions/file", form);
    return data;
  }

  return (
    <HomeComponent
      models={data}
      predictCandidate={predictCandidate}
      predictCandidates={predictCandidates}
    />
  );
}
