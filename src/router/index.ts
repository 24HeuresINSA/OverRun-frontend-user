import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import BeforeRegistrationVue from "@/views/registration/BeforeRegistration.vue";
import RegisterFormVue from "@/views/registration/RegisterForm.vue";
import VaFormlVue from "@/views/registration/VaForm.vue";
import TeamFormVue from "@/views/registration/TeamForm.vue";
import CertificateFormVue from "@/views/registration/CertificateForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/before-registration",
    name: "BeforeReagistration",
    component: BeforeRegistrationVue,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterFormVue,
  },
  {
    path: "/register/va",
    name: "RegisterVa",
    component: VaFormlVue,
  },
  {
    path: "/register/team",
    name: "RegisterTeam",
    component: TeamFormVue,
  },
  {
    path: "/register/certificate",
    name: "RegisterCertificate",
    component: CertificateFormVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
