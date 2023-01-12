import DashboardVue from "@/views/dashboard/Dashboard.vue";
import LoginVue from "@/views/login/Login.vue";
import HelloassoReturn from "@/views/payment/helloassoReturn.vue";
import BeforeRegistrationVue from "@/views/registration/BeforeRegistration.vue";
import CertificateFormVue from "@/views/registration/CertificateForm.vue";
import PaymentFormVue from "@/views/registration/PaymentForm.vue";
import RegisterFormVue from "@/views/registration/RegisterForm.vue";
import TeamFormVue from "@/views/registration/TeamForm.vue";
import VaFormlVue from "@/views/registration/VaForm.vue";
import ResetPasswordVue from "@/views/reset/ResetPassword.vue";
import userSettings from "@/views/userSettings/userSettings.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { setUserWithJWT } from "./queryParams";

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
    beforeEnter: [setUserWithJWT],
  },
  {
    path: "/payment/helloassoreturn",
    name: "HelloAssoReturn",
    component: HelloassoReturn,
    beforeEnter: [setUserWithJWT],
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
    path: "/userSettings",
    name: "userSettings",
    component: userSettings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
