import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Syringe,
  UserRound,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";

type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: "Booked" | "Checked-in" | "Completed";
};

type Doctor = {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  timings: string;
};

type Patient = {
  id: number;
  name: string;
  phone: string;
  visits: number;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Doctor", href: "#doctor" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Admin Demo", href: "#admin" },
];

const services = [
  { name: "General Consultation", icon: Stethoscope, description: "Complete everyday health consultations for adults and seniors." },
  { name: "Pediatric Care", icon: UserRoundCheck, description: "Child-friendly checkups, nutrition advice, and growth monitoring." },
  { name: "Dental Care", icon: HeartPulse, description: "Preventive dental evaluations and referral-based treatment planning." },
  { name: "Cardiology", icon: HeartPulse, description: "Heart risk screening, ECG coordination, and follow-up guidance." },
  { name: "Orthopedics", icon: ShieldCheck, description: "Joint pain and mobility assessments for sports and daily life injuries." },
  { name: "Physiotherapy", icon: Users, description: "Personalized movement recovery plans for post-injury rehabilitation." },
  { name: "Laboratory Tests", icon: Microscope, description: "Reliable blood and diagnostics sample collection with fast reports." },
  { name: "Vaccination", icon: Syringe, description: "Routine and seasonal immunization services for families." },
  { name: "Health Checkup", icon: ClipboardList, description: "Preventive annual packages with detailed medical counseling." },
  { name: "Emergency Care", icon: Ambulance, description: "Immediate first-response support and referral coordination 24/7." },
];

const testimonials = [
  { name: "Aarav Sharma", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", review: "Very calm and clear consultation. I felt heard and cared for throughout.", rating: 5 },
  { name: "Neha Kapoor", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", review: "Clean clinic, on-time appointments, and excellent follow-up support.", rating: 5 },
  { name: "Rohit Mehta", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", review: "The doctor explained every test report in simple language.", rating: 4 },
  { name: "Isha Patel", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", review: "Friendly staff and a professional setup. Highly recommended.", rating: 5 },
  { name: "Karan Verma", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", review: "Got quick treatment and practical advice for long-term recovery.", rating: 4 },
  { name: "Pooja Nair", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80", review: "Best experience for family checkups. Booking is very easy.", rating: 5 },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1666214280420-9899f76f7f2f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
];

const faq = [
  {
    q: "How do I book an appointment?",
    a: "Use the booking form or tap the Book Appointment button in the navigation bar.",
  },
  {
    q: "Do you accept walk-in patients?",
    a: "Yes, but we recommend scheduling online to avoid waiting time.",
  },
  {
    q: "Are emergency services available at night?",
    a: "Emergency support is available 24/7 with on-call triage assistance.",
  },
  {
    q: "What insurance is accepted?",
    a: "Most major insurance providers are supported. Please confirm at reception.",
  },
];

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");
  const [search, setSearch] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patient: "Aarav Sharma", doctor: "Dr. Ananya Rao", date: "2026-06-11", time: "10:00 AM", status: "Booked" },
    { id: 2, patient: "Neha Kapoor", doctor: "Dr. Ananya Rao", date: "2026-06-11", time: "11:30 AM", status: "Checked-in" },
    { id: 3, patient: "Rohit Mehta", doctor: "Dr. Ananya Rao", date: "2026-06-11", time: "01:00 PM", status: "Completed" },
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Ananya Rao",
      qualification: "MBBS, MD (Internal Medicine)",
      specialization: "Family & Preventive Medicine",
      experience: "15+ years",
      timings: "Mon-Sat, 9:00 AM - 6:00 PM",
    },
  ]);

  const [patients] = useState<Patient[]>([
    { id: 1, name: "Aarav Sharma", phone: "+91 98765 43210", visits: 4 },
    { id: 2, name: "Neha Kapoor", phone: "+91 91234 56789", visits: 3 },
    { id: 3, name: "Isha Patel", phone: "+91 90123 45678", visits: 2 },
    { id: 4, name: "Karan Verma", phone: "+91 99887 76655", visits: 1 },
  ]);

  const filteredAppointments = useMemo(
    () => appointments.filter((item) => item.patient.toLowerCase().includes(search.toLowerCase())),
    [appointments, search],
  );

  const filteredPatients = useMemo(
    () => patients.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [patients, search],
  );

  const removeAppointment = (id: number) => setAppointments((prev) => prev.filter((item) => item.id !== id));

  const editAppointmentStatus = (id: number) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Booked" ? "Checked-in" : item.status === "Checked-in" ? "Completed" : "Booked",
            }
          : item,
      ),
    );
  };

  const addDoctor = () => {
    const nextId = doctors.length ? Math.max(...doctors.map((doc) => doc.id)) + 1 : 1;
    setDoctors((prev) => [
      ...prev,
      {
        id: nextId,
        name: `Dr. Visiting Specialist ${nextId}`,
        qualification: "MBBS",
        specialization: "Consultant",
        experience: "8 years",
        timings: "By appointment",
      },
    ]);
  };

  const editDoctor = (id: number) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              timings: doc.timings.includes("Updated") ? "Mon-Sat, 10:00 AM - 7:00 PM" : "Updated: Mon-Sat, 10:00 AM - 7:00 PM",
            }
          : doc,
      ),
    );
  };

  const removeDoctor = (id: number) => setDoctors((prev) => prev.filter((doc) => doc.id !== id));

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSuccess("Appointment request submitted successfully. Our team will contact you shortly.");
    event.currentTarget.reset();
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSuccess("Thank you. Your message has been sent.");
    event.currentTarget.reset();
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSuccess("Subscription successful. You will receive monthly health tips.");
    event.currentTarget.reset();
  };

  return (
    <div className="bg-white text-slate-800">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="hidden border-b border-sky-100 bg-sky-50 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-slate-600 lg:px-8">
            <p className="font-medium">Trusted Single-Doctor Family Clinic Since 2011</p>
            <p className="font-semibold text-sky-700">Mon-Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="HealthyCare Clinic Home">
            <div className="rounded-xl bg-sky-500 p-2 text-white shadow-sm">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold leading-tight text-sky-600">HealthyCare Clinic</p>
              <p className="text-xs text-slate-500">Single-Doctor Family Practice</p>
            </div>
          </a>

          <nav className="hidden rounded-full border border-sky-100 bg-white p-1 shadow-sm md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
            >
              Book Appointment
            </button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 md:hidden"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileNavOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-sky-100 bg-white px-4 pb-5 pt-4 md:hidden"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
                setMobileNavOpen(false);
              }}
              className="mt-4 w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white"
            >
              Book Appointment
            </button>
          </motion.div>
        ) : null}
      </header>

      <main className="pt-20 md:pt-28">
        <section id="home" className="relative overflow-hidden bg-gradient-to-r from-sky-50 via-white to-sky-100">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold tracking-wide text-sky-600">WELCOME TO HEALTHYCARE CLINIC</p>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                HealthyCare Clinic<br />
                <span className="text-sky-600">Your Health, Our Priority</span>
              </h1>
              <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                Personalized and professional care led by one dedicated physician for your family and community.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
                >
                  Book Appointment
                </button>
                <a
                  href="tel:+12345678900"
                  className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80"
                alt="Doctor smiling in clinic"
                className="h-[360px] w-full rounded-2xl object-cover shadow-xl shadow-sky-100 sm:h-[460px] lg:h-[540px]"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { title: "Experienced Doctor", subtitle: "15+ years practical care", icon: UserRound },
            { title: "Advanced Equipment", subtitle: "Modern diagnosis tools", icon: Microscope },
            { title: "Emergency Support", subtitle: "24/7 call assistance", icon: Ambulance },
            { title: "Affordable Treatment", subtitle: "Transparent pricing", icon: CheckCircle2 },
          ].map(({ title, subtitle, icon: Icon }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <Icon className="h-8 w-8 text-sky-500" />
              <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-slate-50 py-12">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["10+", "Doctors Network"],
              ["5000+", "Patients Served"],
              ["15+", "Years Experience"],
              ["98%", "Patient Satisfaction"],
            ].map(([value, label], idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <p className="text-3xl font-bold text-sky-600">{value}</p>
                <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-600">OUR SERVICES</p>
              <h2 className="text-3xl font-bold text-slate-900">Comprehensive Care for Every Need</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {services.map(({ name, icon: Icon, description }) => (
              <div key={name} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Icon className="h-7 w-7 text-sky-500" />
                <h3 className="mt-3 font-semibold text-slate-900">{name}</h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
                <button type="button" className="mt-4 text-sm font-semibold text-sky-600">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold text-sky-600">ABOUT US</p>
              <h2 className="text-3xl font-bold text-slate-900">Compassionate Single-Doctor Clinic You Can Trust</h2>
              <p className="text-slate-600">
                Founded in 2011, HealthyCare Clinic was built with one mission: accessible, ethical, and evidence-based care for every patient.
              </p>
              <p className="text-slate-600">
                <strong>Mission:</strong> Deliver personalized treatment with dignity and transparency.
              </p>
              <p className="text-slate-600">
                <strong>Vision:</strong> Become the community's most trusted neighborhood medical clinic.
              </p>
              <ul className="space-y-2 text-slate-700">
                {[
                  "Personal continuity of care with one dedicated doctor",
                  "Modern diagnostics and clean clinical environment",
                  "Transparent pricing and preventive care guidance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 4).map((image, idx) => (
                <img
                  key={`${image}-${idx}`}
                  src={image}
                  alt="Clinic view"
                  className="h-44 w-full rounded-xl object-cover shadow-sm sm:h-52"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="doctor" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">Doctor Profile</h2>
          <div className="grid gap-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[300px_1fr]">
              <img
              src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=700&q=80"
              alt="Dr. Ananya Rao"
                className="h-72 w-full rounded-xl object-cover sm:h-80"
            />
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900">Dr. Ananya Rao</h3>
              <p className="text-slate-600">MBBS, MD (Internal Medicine)</p>
              <p className="text-slate-700">Specialization: Family Medicine, Preventive Health, Chronic Disease Management</p>
              <p className="text-slate-700">Experience: 15+ Years</p>
              <p className="text-slate-700">Available Timings: Mon-Sat, 9:00 AM - 6:00 PM</p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="rounded-lg bg-sky-500 px-5 py-3 font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </section>

        <section id="appointment" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl font-bold text-slate-900">Appointment Booking</h2>
            <p className="mt-2 text-slate-600">Book your consultation in under one minute.</p>
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submitBooking}>
              <input required placeholder="Patient Name" className="rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="tel" placeholder="Mobile Number" className="rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="email" placeholder="Email" className="rounded-lg border border-slate-300 px-3 py-2" />
              <select required className="rounded-lg border border-slate-300 px-3 py-2">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input required type="number" min={0} placeholder="Age" className="rounded-lg border border-slate-300 px-3 py-2" />
              <select required className="rounded-lg border border-slate-300 px-3 py-2">
                <option value="">Doctor Selection</option>
                <option>Dr. Ananya Rao</option>
              </select>
              <input required type="date" className="rounded-lg border border-slate-300 px-3 py-2" />
              <select required className="rounded-lg border border-slate-300 px-3 py-2">
                <option value="">Time Slot</option>
                <option>09:00 AM</option>
                <option>10:30 AM</option>
                <option>12:00 PM</option>
                <option>03:00 PM</option>
              </select>
              <textarea required placeholder="Symptoms" rows={4} className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2" />
              <button className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 sm:col-span-2">
                Submit
              </button>
            </form>
            {bookingSuccess ? <p className="mt-4 font-medium text-teal-600">{bookingSuccess}</p> : null}
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">Patient Testimonials</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <div className="flex text-amber-400">
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.review}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-slate-900">Clinic Gallery</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {galleryImages.map((image, idx) => (
                <motion.img
                  key={`${image}-${idx}`}
                  src={image}
                  alt="Clinic gallery"
                  className="h-44 w-full rounded-xl object-cover shadow-sm md:h-56"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">Contact Us</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-sky-500" /> 24 Wellness Street, Downtown, City</p>
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-sky-500" /> +1 234 567 8900</p>
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-sky-500" /> care@healthycareclinic.com</p>
              <p className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-sky-500" /> Mon-Sat: 9:00 AM - 6:00 PM</p>
              <iframe
                title="Clinic location"
                src="https://maps.google.com/maps?q=New%20York%20Medical%20Center&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-64 w-full rounded-lg border-0"
                loading="lazy"
              />
            </div>

            <form onSubmit={submitContact} className="space-y-3 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <input required placeholder="Full Name" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="email" placeholder="Email" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <textarea required placeholder="Message" rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <button className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600">Send Message</button>
              {contactSuccess ? <p className="text-sm font-medium text-teal-600">{contactSuccess}</p> : null}
            </form>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faq.map((item) => (
                  <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
                    <p className="mt-2 text-sm text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Health Blog</h2>
              <div className="space-y-3">
                {[
                  "5 Preventive Health Checks Every Adult Should Do Yearly",
                  "How to Build a Heart-Healthy Daily Routine",
                  "When to Visit a Doctor for Persistent Fatigue",
                ].map((title) => (
                  <article key={title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">Read practical tips from our doctor to stay healthy and informed.</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Join Our Health Newsletter</h2>
          <p className="mt-2 text-slate-600">Get monthly wellness updates and clinic announcements.</p>
          <form onSubmit={submitNewsletter} className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input required type="email" placeholder="Enter your email" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
            <button className="rounded-lg bg-sky-500 px-6 py-2 font-semibold text-white transition hover:bg-sky-600">Subscribe</button>
          </form>
          {newsletterSuccess ? <p className="mt-3 text-sm font-medium text-teal-600">{newsletterSuccess}</p> : null}
        </section>

        <section id="admin" className="bg-slate-900 py-16 text-slate-100">
          <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold">Admin Demo Dashboard</h2>
              <p className="mt-1 text-slate-300">Simple demonstration panel for clinic management tasks.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Total Patients", "5000+", Users],
                ["Total Appointments", `${appointments.length}`, CalendarDays],
                ["Doctors Available", `${doctors.length}`, UserRound],
                ["Today's Visits", "27", ClipboardList],
              ].map(([title, value, Icon]) => (
                <div key={title as string} className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                  <Icon className="h-5 w-5 text-sky-400" />
                  <p className="mt-3 text-sm text-slate-300">{title as string}</p>
                  <p className="text-2xl font-bold text-white">{value as string}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">Manage Appointments</h3>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient"
                  className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-slate-300">
                    <tr>
                      <th className="p-2">Patient</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Time</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((item) => (
                      <tr key={item.id} className="border-t border-slate-700">
                        <td className="p-2">{item.patient}</td>
                        <td className="p-2">{item.date}</td>
                        <td className="p-2">{item.time}</td>
                        <td className="p-2">{item.status}</td>
                        <td className="p-2 space-x-2">
                          <button type="button" className="text-sky-400" onClick={() => editAppointmentStatus(item.id)}>Edit</button>
                          <button type="button" className="text-red-400" onClick={() => removeAppointment(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Manage Doctors</h3>
                  <button type="button" onClick={addDoctor} className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold">
                    Add Doctor
                  </button>
                </div>
                <ul className="space-y-3 text-sm">
                  {doctors.map((doc) => (
                    <li key={doc.id} className="rounded-lg border border-slate-700 p-3">
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-slate-300">{doc.specialization}</p>
                      <p className="text-slate-300">{doc.timings}</p>
                      <div className="mt-2 space-x-3">
                        <button type="button" className="text-sky-400" onClick={() => editDoctor(doc.id)}>Edit</button>
                        <button type="button" className="text-red-400" onClick={() => removeDoctor(doc.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-semibold">Patient Records</h3>
                <ul className="space-y-3 text-sm">
                  {filteredPatients.map((patient) => (
                    <li key={patient.id} className="rounded-lg border border-slate-700 p-3">
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-slate-300">Phone: {patient.phone}</p>
                      <p className="text-slate-300">Visits: {patient.visits}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showModal ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Online Appointment</h3>
              <button type="button" onClick={() => setShowModal(false)} aria-label="Close modal">
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>
            <form
              className="space-y-3"
              onSubmit={(event) => {
                submitBooking(event);
                setShowModal(false);
              }}
            >
              <input required placeholder="Patient Name" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="tel" placeholder="Mobile Number" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
              <button className="w-full rounded-lg bg-sky-500 py-2 font-semibold text-white">Confirm Booking</button>
            </form>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
