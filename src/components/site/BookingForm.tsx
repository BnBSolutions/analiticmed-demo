import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CLINIC, diagnostics, bookingDoctors, specialties } from "@/data/site";
import { useT } from "@/lib/i18n";

export function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const { t, lang } = useT();
  const ru = lang === "ru";
  const [sent, setSent] = useState(false);
  const [service, setService] = useState(defaultService);
  const [doctorId, setDoctorId] = useState("");
  const availableDoctors = bookingDoctors.filter((doctor) => doctor.services.includes(service));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent)
    return (
      <div className="rounded-xl bg-tint p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-primary-dark" />
        <p className="mt-4 text-lg font-bold">{ru ? "Спасибо! Заявка принята." : "Mulțumim! Cererea a fost primită."}</p>
        <p className="mt-2 text-muted-foreground">
          {ru ? "Для срочной записи позвоните:" : "Pentru o programare urgentă sunați la:"}{" "}
          <a href={CLINIC.phoneHref} className="font-semibold text-primary-dark">{CLINIC.phone}</a>
        </p>
      </div>
    );
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-card p-6 md:grid-cols-2 md:p-8">
      <label className="grid gap-1.5 text-sm font-medium">
        {ru ? "Имя и фамилия" : "Nume și prenume"}
        <input required name="name" autoComplete="name" className="field" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {ru ? "Телефон" : "Telefon"}
        <input required name="phone" type="tel" autoComplete="tel" pattern="[0-9+ ]{8,}" className="field" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {ru ? "Специальность / услуга" : "Specialitate / serviciu"}
        <select required name="service" value={service} onChange={(e) => { setService(e.target.value); setDoctorId(""); }} className="field">
          <option value="" disabled>{ru ? "Выберите" : "Alegeți"}</option>
          <optgroup label={ru ? "Диагностика" : "Diagnostică"}>
            {diagnostics.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}
          </optgroup>
          <optgroup label={ru ? "Специальности" : "Specialități"}>
            {specialties.map((s) => <option key={s.slug} value={s.slug}>{t(s.name)}</option>)}
          </optgroup>
          <option value="laborator">{ru ? "Лабораторные анализы" : "Analize de laborator"}</option>
          <option value="check-up">Check-up</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {ru ? "Желаемая дата" : "Data dorită"}
        <input required name="date" type="date" className="field" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium md:col-span-2">
        {ru ? "Врач (необязательно)" : "Medic (opțional)"}
        <select name="doctor" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} disabled={!service || availableDoctors.length === 0} className="field disabled:opacity-60">
          <option value="">{!service ? (ru ? "Сначала выберите услугу" : "Alegeți mai întâi serviciul") : availableDoctors.length === 0 ? (ru ? "Без предпочтений — список врачей пока недоступен" : "Fără preferință — lista medicilor nu este disponibilă încă") : (ru ? "Без предпочтений" : "Fără preferință")}</option>
          {availableDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>{t(doctor.name)} {ru ? "(пример)" : "(exemplu)"}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn-primary md:col-span-2">
        {ru ? "Отправить заявку" : "Trimite cererea"}
      </button>
      <p className="text-xs text-muted-foreground md:col-span-2">
        {ru ? "Администратор перезвонит вам для подтверждения времени." : "Administratorul vă va suna pentru confirmarea orei."}
      </p>
    </form>
  );
}
