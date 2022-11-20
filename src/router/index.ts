import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BeforeRegistrationVue from "@/views/registration/BeforeRegistration.vue";
import RegisterFormVue from "@/views/registration/RegisterForm.vue";
import VaFormlVue from "@/views/registration/VaForm.vue";
import TeamFormVue from "@/views/registration/TeamForm.vue";
import CertificateFormVue from "@/views/registration/CertificateForm.vue";
import DashboardVue from "@/views/dashboard/Dashboard.vue";
import ResetPasswordVue from "@/views/reset/ResetPassword.vue";
import PaymentFormVue from "@/views/registration/PaymentForm.vue";
import LoginVue from "@/views/login/Login.vue";
import Settings from "@/views/settings/Settings.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: DashboardVue,
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
  {
    path: "/register/payment",
    name: "RegisterPayment",
    component: PaymentFormVue,
  },
  {
    path: "/reset",
    name: "ResetPassword",
    component: ResetPasswordVue,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginVue,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
