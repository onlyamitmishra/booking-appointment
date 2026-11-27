import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, CalendarDays, ChevronRight, Download, FileText, LayoutDashboard, Menu, ReceiptIndianRupee, Stethoscope, UserRound, X, CreditCard, Building2, ShieldCheck, Search, CircleCheck, Clock3, BedDouble, Users, ClipboardList, Plus, LogOut } from 'lucide-react';
import './styles.css';

const initialState = {
  appointments: [{ id: 1, patient: 'Amit Mishra', doctor: 'Dr. Amit Mishra', specialty: 'Cardiology', date: 'Today', time: '10:30 AM', status: 'Confirmed', room: '101' }],
  records: [
    { id: 1, title: 'Comprehensive Blood Panel', meta: 'Laboratory • 28 Sep 2026', category: 'LAB' },
    { id: 2, title: 'Prescription — Cardiology', meta: 'Dr. Amit Mishra • 28 Sep 2026', category: 'RX' },
    { id: 3, title: 'ECG Report', meta: 'Cardiology • 21 Sep 2026', category: 'LAB' }
  ],
  invoices: [{ id: 'MS-2026-1042', title: 'Cardiology Consultation', doctor: 'Dr. Amit Mishra', amount: 1180, status: 'Pending' }],
  audit: [{ time: '10:18 AM', user: 'Amit Mishra', role: 'Patient', action: 'Opened Medical Records', security: 'Encrypted' }],
  rooms: [{ id: '101', name: 'Cardiology', doctor: 'Dr. Amit Mishra', status: 'Occupied' }, { id: '102', name: 'Cardiology', doctor: 'Dr. Riya Sharma', status: 'Available' }, { id: '103', name: 'General Medicine', doctor: '—', status: 'Available' }]
};

function useStore() {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('medisync-state')) || initialState; } catch { return initialState; }
  });
  useEffect(() => localStorage.setItem('medisync-state', JSON.stringify(state)), [state]);
  return [state, setState];
}

function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-mark">+</span><span>Medi<span>Sync</span></span></div>;
}

function Landing({ enter, register }) {
  const [loginRole, setLoginRole] = useState(null);
  return <>
    <main className="landing landing-premium">
      <nav className="landing-nav premium-nav">
        <a className="landing-brand" href="#home" aria-label="MediSync home"><Logo/></a>
        <div className="premium-links"><a href="#care">Patient care</a><a href="#clinical">Clinical</a><a href="#operations">Clinic teams</a></div>
        <div className="premium-role-signins"><button className="premium-role-link" onClick={() => setLoginRole('Patient')}><UserRound size={14}/>Patient sign in</button><button className="premium-role-link" onClick={() => setLoginRole('Doctor')}><Stethoscope size={14}/>Doctor sign in</button><button className="premium-role-link" onClick={() => setLoginRole('Admin / Reception')}><Building2 size={14}/>Admin sign in</button></div>
        <div className="premium-actions"><button className="premium-register" onClick={register}>Register <ChevronRight size={16}/></button></div>
      </nav>
      <section className="premium-hero" id="home">
        <div className="premium-hero-copy">
          <span className="premium-eyebrow"><i/> CONNECTED HEALTHCARE, MADE HUMAN</span>
          <h1>Better care starts with everything in sync.</h1>
          <p>Appointments, health records and payments in one calm, connected experience for patients and the teams who care for them.</p>
          <div className="premium-hero-actions"><button className="premium-register premium-register-large" onClick={register}>Create patient profile <ChevronRight size={18}/></button><button className="premium-text-link" onClick={() => setLoginRole('Patient')}>Returning patient? Patient sign in</button></div>
          <div className="hero-assurance"><span><ShieldCheck size={16}/> Role-based access</span><span><CircleCheck size={16}/> One connected portal</span></div>
        </div>
      </section>
      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="capabilities-heading"><span>ONE PORTAL, THREE WORKFLOWS</span><h2 id="capabilities-title">Designed around the people behind every visit.</h2><p>From booking a first appointment to coordinating a full clinic day, the right tools are close at hand.</p></div>
        <div className="capability-grid">
          <article className="capability-item" id="care"><div className="capability-top"><span className="capability-number">01 / PATIENTS</span><span className="capability-icon patient-icon"><UserRound size={20}/></span></div><h3>Your health, within reach.</h3><p>Simple self-service for the moments before, during and after a visit.</p><ul><li><CalendarDays size={16}/> Book and manage appointments</li><li><FileText size={16}/> View reports and prescriptions</li><li><CreditCard size={16}/> Track bills and payments</li></ul><button className="capability-login" onClick={() => setLoginRole('Patient')}>Patient sign in <ChevronRight size={15}/></button></article>
          <article className="capability-item" id="clinical"><div className="capability-top"><span className="capability-number">02 / CLINICIANS</span><span className="capability-icon clinical-icon"><Stethoscope size={20}/></span></div><h3>More context for every decision.</h3><p>A focused clinical workspace for the rhythm of daily care.</p><ul><li><CalendarDays size={16}/> Review schedules and appointments</li><li><UserRound size={16}/> Understand patient history</li><li><FileText size={16}/> Issue prescriptions and release reports</li></ul><button className="capability-login" onClick={() => setLoginRole('Doctor')}>Doctor sign in <ChevronRight size={15}/></button></article>
          <article className="capability-item" id="operations"><div className="capability-top"><span className="capability-number">03 / CLINIC TEAMS</span><span className="capability-icon operations-icon"><Building2 size={20}/></span></div><h3>Clinic operations, in step.</h3><p>Keep front-desk coordination and daily oversight connected.</p><ul><li><Users size={16}/> Register walk-ins and assign rooms</li><li><ReceiptIndianRupee size={16}/> Reconcile billing and refunds</li><li><ClipboardList size={16}/> Review operational audit logs</li></ul><button className="capability-login" onClick={() => setLoginRole('Admin / Reception')}>Clinic admin sign in <ChevronRight size={15}/></button></article>
        </div>
      </section>
      <section className="premium-cta"><div><span>YOUR NEXT VISIT STARTS HERE</span><h2>Make room for better care.</h2><p>Create a patient profile to get started with MediSync.</p></div><button className="premium-register premium-register-large" onClick={register}>Register as a new patient <ChevronRight size={18}/></button></section>
      <footer className="premium-footer"><a className="footer-brand" href="#home"><Logo/></a><span>Patient care, clinical workflows and clinic operations.</span><small>Prototype experience • Use sample information only</small></footer>
    </main>
    {loginRole && <LoginModal role={loginRole} close={() => setLoginRole(null)} enter={enter} register={register}/>}
  </>;
}

function RegistrationPage({ back }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    if (formData.accountPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const email = formData.email.trim().toLowerCase();

    try {
      const accounts = JSON.parse(localStorage.getItem('medisync-login-accounts') || '[]');
      if (accounts.some(account => account.email === email)) {
        setError('An account already uses this email address. Sign in or use a different email.');
        return;
      }
      const passwordHash = await hashPassword(formData.accountPassword);
      const fullName = [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ').trim();
      const registrationData = { ...formData, email, id: `MS-P-${Date.now()}`, submittedAt: new Date().toISOString() };
      delete registrationData.accountPassword;
      delete registrationData.confirmPassword;
      const saved = JSON.parse(localStorage.getItem('medisync-patient-registrations') || '[]');
      localStorage.setItem('medisync-patient-registrations', JSON.stringify([...saved, registrationData]));
      localStorage.setItem('medisync-login-accounts', JSON.stringify([...accounts, { email, role: 'Patient', passwordHash, name: fullName }]));
      setError('');
      setSubmitted(true);
    } catch {
      setError('This browser could not save the registration. Please check local storage and try again.');
    }
  };

  return <main className="registration-page">
    <header className="registration-header"><Logo/><button className="registration-back" type="button" onClick={back}>Back to MediSync</button></header>
    {submitted ? <section className="registration-success"><span className="success-mark"><CircleCheck size={30}/></span><span className="eyebrow teal">REGISTRATION COMPLETE</span><h1>Your patient profile is ready.</h1><p>Your information was saved in this browser only. It is not encrypted or sent to a clinic; use sample information in this prototype.</p><button className="btn-primary" onClick={back}>Return to MediSync <ChevronRight size={18}/></button></section> : <div className="registration-layout">
      <aside className="registration-intro"><span className="eyebrow teal">PATIENT INTAKE</span><h1>Start with the details that help us care for you.</h1><p>Complete your profile before your first appointment. Fields marked required are needed to register.</p><div className="intake-note"><ShieldCheck size={17}/><span>Prototype only. Information is saved in this browser without encryption. Use sample data; nothing is sent to a clinic.</span></div></aside>
      <form className="registration-form" onSubmit={submit}>
        <section className="form-section"><div className="form-section-heading"><span>01</span><div><h2>Personal details</h2><p>Use your legal name and date of birth.</p></div></div><div className="form-grid">
          <label>First name *<input name="firstName" autoComplete="given-name" required/></label>
          <label>Middle name<input name="middleName" autoComplete="additional-name"/></label>
          <label>Last name *<input name="lastName" autoComplete="family-name" required/></label>
          <label>Date of birth *<input name="dateOfBirth" type="date" autoComplete="bday" required/></label>
          <label>Sex at birth *<select name="sexAtBirth" defaultValue="" required><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Intersex</option><option>Prefer not to say</option></select></label>
          <label>Gender identity <span className="optional">Optional</span><input name="genderIdentity"/></label>
          <label>Pronouns <span className="optional">Optional</span><input name="pronouns" placeholder="e.g. she/her"/></label>
        </div></section>
        <section className="form-section"><div className="form-section-heading"><span>02</span><div><h2>Contact & address</h2><p>We use these details for appointment updates.</p></div></div><div className="form-grid">
          <label>Mobile phone *<input name="phone" type="tel" autoComplete="tel" required/></label>
          <label>Email address *<input name="email" type="email" autoComplete="email" required/></label>
          <label>Preferred contact method *<select name="preferredContact" defaultValue="Email" required><option>Email</option><option>Phone call</option><option>Text message</option></select></label>
          <label>Address line 1 *<input name="address1" autoComplete="address-line1" required/></label>
          <label>Address line 2 <span className="optional">Optional</span><input name="address2" autoComplete="address-line2"/></label>
          <label>City / town *<input name="city" autoComplete="address-level2" required/></label>
          <label>State / province *<input name="region" autoComplete="address-level1" required/></label>
          <label>Postal code *<input name="postalCode" autoComplete="postal-code" required/></label>
          <label>Country *<input name="country" autoComplete="country-name" required/></label>
        </div></section>
        <section className="form-section"><div className="form-section-heading"><span>03</span><div><h2>Emergency contact</h2><p>Someone we can contact if needed.</p></div></div><div className="form-grid">
          <label>Contact full name *<input name="emergencyName" required/></label>
          <label>Relationship to you *<input name="emergencyRelationship" required/></label>
          <label>Emergency contact phone *<input name="emergencyPhone" type="tel" required/></label>
        </div></section>
        <section className="form-section"><div className="form-section-heading"><span>04</span><div><h2>Health & coverage</h2><p>Optional information that can help prepare for your visit.</p></div></div><div className="form-grid">
          <label>Known allergies <span className="optional">Optional</span><textarea name="allergies" placeholder="List allergies, or write 'None known'"/></label>
          <label>Current medications <span className="optional">Optional</span><textarea name="medications" placeholder="Include dose if known"/></label>
          <label>Medical conditions <span className="optional">Optional</span><textarea name="conditions"/></label>
          <label>Previous surgeries or procedures <span className="optional">Optional</span><textarea name="procedures"/></label>
          <label>Family medical history <span className="optional">Optional</span><textarea name="familyHistory"/></label>
          <label>Insurance provider <span className="optional">Optional</span><input name="insuranceProvider"/></label>
          <label>Member / policy number <span className="optional">Optional</span><input name="insuranceMemberId"/></label>
          <label>Primary care provider <span className="optional">Optional</span><input name="primaryCareProvider"/></label>
          <label>Preferred pharmacy <span className="optional">Optional</span><input name="preferredPharmacy"/></label>
          <label>Accessibility or language needs <span className="optional">Optional</span><input name="accessibilityNeeds"/></label>
        </div></section>
        <section className="form-section"><div className="form-section-heading"><span>05</span><div><h2>Patient portal login</h2><p>Your email and password will be your unique sign-in.</p></div></div><div className="form-grid">
          <label>Login password *<input name="accountPassword" type="password" autoComplete="new-password" minLength="8" required/></label>
          <label>Confirm password *<input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required/></label>
        </div></section>
        <div className="registration-submit"><label className="consent-check"><input name="consent" type="checkbox" required/><span>I confirm that the information provided is accurate and consent to its use for this prototype registration. *</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="btn-primary" type="submit">Create patient profile <ChevronRight size={18}/></button><small>* Required fields</small></div>
      </form>
    </div>}
  </main>;
}

async function hashPassword(password) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

function nameFromEmail(email) {
  const base = email.split('@')[0] || 'Portal User';
  return base.split(/[._-]+/).filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || 'Portal User';
}

function getAccountName(account) {
  if (account?.name?.trim()) return account.name.trim();
  if (account?.role === 'Patient') {
    const registrations = JSON.parse(localStorage.getItem('medisync-patient-registrations') || '[]');
    const registration = registrations.find(item => item.email === account.email);
    if (registration) return [registration.firstName, registration.middleName, registration.lastName].filter(Boolean).join(' ').trim();
  }
  return nameFromEmail(account?.email || 'portal.user@example.com');
}

function LoginModal({role,close,enter,register}) {
  const [email,setEmail] = useState(''); const [password,setPassword] = useState(''); const [error,setError] = useState(''); const [busy,setBusy] = useState(false);
  const roleLabel = role === 'Admin / Reception' ? 'Clinic admin' : role;
  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    try {
      const accounts = JSON.parse(localStorage.getItem('medisync-login-accounts') || '[]');
      const passwordHash = await hashPassword(password);
      const account = accounts.find(item => item.email === email.trim().toLowerCase() && item.role === role && item.passwordHash === passwordHash);
      if (!account) {
        setError(`No matching ${roleLabel.toLowerCase()} account. Check your email and password, or create a local demo account.`);
        setBusy(false);
        return;
      }
      enter(role, getAccountName(account));
    } catch {
      setError('Sign-in is unavailable in this browser.');
    }
    setBusy(false);
  };
  const createDemoAccount = async () => {
    if (!email.trim() || password.length < 8) {
      setError('Enter your email and a password with at least 8 characters to create a local demo account.');
      return;
    }
    setBusy(true);
    try {
      const accounts = JSON.parse(localStorage.getItem('medisync-login-accounts') || '[]');
      const normalizedEmail = email.trim().toLowerCase();
      if (accounts.some(account => account.email === normalizedEmail)) {
        setError('This email already has an account. Sign in using the portal it was created for.');
        setBusy(false);
        return;
      }
      const passwordHash = await hashPassword(password);
      const demoName = nameFromEmail(normalizedEmail);
      localStorage.setItem('medisync-login-accounts', JSON.stringify([...accounts, { email: normalizedEmail, role, passwordHash, name: demoName }]));
      setEmail(normalizedEmail);
      setError('Local demo account created. Select Sign in to continue.');
    } catch {
      setError('This browser could not save the demo account.');
    }
    setBusy(false);
  };
  return <div className="modal-backdrop" onMouseDown={event=>event.target===event.currentTarget&&close()}><div className="login-modal login-modal-role"><button className="modal-x" onClick={close} aria-label="Close sign in"><X size={20}/></button><div className="login-brand"><Logo/></div><span className="login-role-label">{roleLabel.toUpperCase()} PORTAL</span><h2>{roleLabel} sign in</h2><p>Sign in with the unique email and password for this account.</p><form className="login-fields" onSubmit={submit}><label>Email address<input type="email" autoComplete="username" value={email} onChange={event=>setEmail(event.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} required/></label>{error&&<p className="login-error" role="status">{error}</p>}<button className="btn-primary wide" type="submit" disabled={busy}>{busy?'Checking account...':`Sign in to ${roleLabel}`} <ChevronRight size={17}/></button></form>{role==='Patient'&&<button className="modal-register" onClick={()=>{close();register()}}>New patient? Register here</button>}<button className="login-create-account" onClick={createDemoAccount} disabled={busy}>Create a unique local demo account</button><small className="login-local-note"><ShieldCheck size={14}/> Prototype only. Accounts are stored in this browser; this is not production authentication.</small></div></div>
}

function Sidebar({role,section,setSection,enterRole,setLanding}) {
  const config = role==='Patient'?{accent:'teal',label:'PATIENT PORTAL',links:[['Dashboard',LayoutDashboard],['Appointments',CalendarDays],['Medical Records',FileText],['Billing & Payments',ReceiptIndianRupee]]}:role==='Doctor'?{accent:'blue',label:'DOCTOR PORTAL',links:[['Dashboard',LayoutDashboard],['Daily Schedule',CalendarDays],['Patient History',UserRound],['Prescriptions',FileText],['Lab & Imaging',Stethoscope]]}:{accent:'amber',label:'ADMIN / RECEPTION',links:[['Dashboard',LayoutDashboard],['Room Allocation',BedDouble],['Walk-ins',Users],['Billing Reconciliation',ReceiptIndianRupee],['Audit Logs',ClipboardList]]};
  return <aside className="sidebar"><div className="sidebar-brand"><Logo/></div><nav>{config.links.map(([name,Icon])=> <button key={name} className={section===name?'active':''} onClick={()=>setSection(name)}><Icon size={18}/><span>{name}</span></button>)}</nav><div className="sidebar-bottom"><label>QUICK DEMO SWITCHER</label><select value={role} onChange={e=>{enterRole(e.target.value);setSection('Dashboard')}}><option>Patient</option><option>Doctor</option><option>Admin / Reception</option></select><button className="exit" onClick={setLanding}><LogOut size={16}/> Exit portal</button><span className="portal-label">{config.label}</span></div></aside>
}

function Portal({role,setRole,setLanding,userName}) {
  const [state,setState] = useStore(); const [section,setSection] = useState('Dashboard'); const [mobile,setMobile] = useState(false);
  const addAudit=(action)=>setState(s=>({...s,audit:[{time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),user:userName,role,action,security:'Encrypted'},...s.audit]}));
  return <div className="app-shell"><button className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button><div className={mobile?'sidebar-mobile open':'sidebar-mobile'}><Sidebar role={role} section={section} setSection={n=>{setSection(n);setMobile(false)}} enterRole={setRole} setLanding={setLanding}/></div><div className="desktop-sidebar"><Sidebar role={role} section={section} setSection={setSection} enterRole={setRole} setLanding={setLanding}/></div><main className="portal-main">{role==='Patient'?<Patient state={state} setState={setState} section={section} setSection={setSection} addAudit={addAudit} userName={userName}/>:role==='Doctor'?<Doctor state={state} setState={setState} section={section} addAudit={addAudit}/>:<Admin state={state} setState={setState} section={section} addAudit={addAudit}/>}</main></div>
}

function PortalHeader({title,button,onButton}) { return <header className="portal-header"><div><span>Good morning,</span><h1>{title}</h1></div><div className="header-actions"><button className="icon-button"><Bell size={19}/><i/></button>{button&&<button className="btn-primary" onClick={onButton}>{button}</button>}</div></header> }

function Patient({state,setState,section,setSection,addAudit,userName}) {
  const [modal,setModal]=useState(null); const [booking,setBooking]=useState(false);
  if(section==='Appointments') return <><PortalHeader title="Appointments" button="+ Book Appointment" onButton={()=>setBooking(true)}/><Appointments state={state} setState={setState} addAudit={addAudit} openBooking={()=>setBooking(true)}/> {booking&&<Booking onClose={()=>setBooking(false)} state={state} setState={setState} addAudit={addAudit} patientName={userName}/>}</>;
  if(section==='Medical Records') return <><PortalHeader title="Medical Records"/><Records state={state} setState={setState} modal={modal} setModal={setModal} patientName={userName}/></>;
  if(section==='Billing & Payments') return <><PortalHeader title="Billing & Payments"/><Billing state={state} setState={setState} addAudit={addAudit}/></>;
  return <><PortalHeader title={userName} button="+ Book Appointment" onButton={()=>setBooking(true)}/><div className="dashboard-grid"><article className="action-card"><span className="card-label">UPCOMING APPOINTMENT</span><h3>{state.appointments[0]?.doctor||'No appointment'}</h3><p>{state.appointments[0]?.specialty||'Cardiology'} Department</p><div className="appointment-badge">TODAY • {state.appointments[0]?.time||'10:30 AM'}</div><div className="card-links"><button onClick={()=>setBooking(true)}>Reschedule</button><button onClick={()=>{setState(s=>({...s,appointments:s.appointments.slice(1)}));addAudit('Cancelled appointment')}}>Cancel</button></div></article><article className="action-card"><span className="card-label">RECENT RECORDS</span>{state.records.slice(0,2).map(r=><button className="record-link" key={r.id} onClick={()=>setModal(r)}><b>{r.title}</b><small>Ready to view</small></button>)}</article></div><div className="stats"><Stat label="Appointments" value={String(state.appointments.length).padStart(2,'0')} tone="teal"/><Stat label="Records" value={String(state.records.length).padStart(2,'0')} tone="blue"/><Stat label="Pending bill" value={`₹${state.invoices.filter(i=>i.status==='Pending').reduce((n,i)=>n+i.amount,0).toLocaleString('en-IN')}`} tone="amber"/></div>{modal&&<DocumentModal record={modal} close={()=>setModal(null)} patientName={userName}/>} {booking&&<Booking onClose={()=>setBooking(false)} state={state} setState={setState} addAudit={addAudit} patientName={userName}/>}</>;
}

function Stat({label,value,tone}) { return <article className="stat"><span>{label}</span><strong>{value}</strong><i className={tone}/></article> }

function Appointments({state,setState,addAudit,openBooking}) { return <><div className="section-card"><div className="section-heading"><h2>My appointments</h2><span className="role-badge-inline"><ShieldCheck size={14}/> 24/7 self-service</span></div>{state.appointments.length?<div className="appointment-list">{state.appointments.map(a=> <div className="appointment-row" key={a.id}><div className="date-block"><b>{a.time}</b><small>{a.date}</small></div><div><h3>{a.doctor}</h3><p>{a.specialty} • Room {a.room}</p></div><span className="status paid">{a.status}</span><div className="row-actions"><button onClick={openBooking}>Reschedule</button><button onClick={()=>{setState(s=>({...s,appointments:s.appointments.filter(x=>x.id!==a.id)}));addAudit('Cancelled appointment')}}>Cancel</button></div></div>)}</div>:<div className="empty">No appointments scheduled. <button onClick={openBooking}>Book one now</button></div>}</div></> }

function Booking({onClose,state,setState,addAudit,patientName}) {
  const [step,setStep]=useState(1); const [specialty,setSpecialty]=useState('Cardiology'); const [doctor,setDoctor]=useState('Dr. Amit Mishra'); const [slot,setSlot]=useState('10:30 AM');
  const doctors=[['Dr. Amit Mishra','12 yrs','10:30 AM'],['Dr. Riya Sharma','8 yrs','12:00 PM'],['Dr. Kabir Rao','15 yrs','03:30 PM']];
  const confirm=()=>{const ap={id:Date.now(),patient:patientName,doctor,specialty,date:'Tomorrow',time:slot,status:'Confirmed',room:'101'};setState(s=>({...s,appointments:[ap,...s],invoices:[{id:`MS-${Date.now().toString().slice(-4)}`,title:`${specialty} Consultation`,doctor,amount:1180,status:'Pending'},...s.invoices]}));addAudit(`Booked ${specialty} appointment with ${doctor}`);onClose();};
  return <div className="modal-backdrop"><div className="booking-modal"><button className="modal-x" onClick={onClose}><X size={20}/></button><div className="wizard-layout"><aside><h3>Appointment</h3>{['Choose specialty','Choose doctor','Select slot','Confirm'].map((x,i)=><div key={x} className={step>=i+1?'step active':'step'}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</aside><section><span className="card-label">STEP {step} OF 4</span><h2>Book an appointment</h2>{step===1&&<><p>Select your preferred care option</p><div className="pills">{['CARDIOLOGY','GENERAL MEDICINE','ORTHOPEDICS','DERMATOLOGY','PEDIATRICS'].map(x=><button className={specialty.toUpperCase()===x?'selected':''} key={x} onClick={()=>setSpecialty(x==='CARDIOLOGY'?'Cardiology':x.toLowerCase().replace(/(^| )\w/g,c=>c.toUpperCase()))}>{x}</button>)}</div></>}{step===2&&<div className="doctor-list">{doctors.map(([d,exp,t])=><button className={doctor===d?'doctor selected':'doctor'} key={d} onClick={()=>{setDoctor(d);setSlot(t)}}><span>DR</span><div><b>{d}</b><small>{specialty} • {exp}</small></div><Clock3 size={16}/></button>)}</div>}{step===3&&<><p>Select an available time</p><div className="slots">{['09:30 AM','10:30 AM','12:00 PM','03:30 PM','04:30 PM'].map(t=><button className={slot===t?'selected':''} key={t} onClick={()=>setSlot(t)}>{t}</button>)}</div></>}{step===4&&<div className="booking-summary"><p><span>Specialty</span><b>{specialty}</b></p><p><span>Doctor</span><b>{doctor}</b></p><p><span>Date & time</span><b>Tomorrow • {slot}</b></p><p><span>Consultation fee</span><b>₹1,180</b></p></div>}<button className="btn-primary wide" onClick={()=>step<4?setStep(step+1):confirm()}>{step<4?'Continue →':'Confirm Booking'}</button></section></div></div></div>
}

function Records({state,modal,setModal,patientName}) {
  const [filter,setFilter]=useState('ALL'); const visible=filter==='ALL'?state.records:state.records.filter(r=>r.category===filter);
  return <div className="section-card records-card"><div className="section-heading"><h2>Medical Records</h2><span className="role-badge-inline"><ShieldCheck size={14}/> ROLE-BASED ACCESS</span></div><div className="tabs">{['ALL','LAB','RX'].map(t=><button className={filter===t?'selected':''} key={t} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="record-list">{visible.map(r=><div className="record-row" key={r.id}><div className="pdf-icon">PDF</div><div><h3>{r.title}</h3><p>{r.meta}</p></div><span className="ready">PDF • Ready</span><button onClick={()=>setModal(r)}>View</button></div>)}</div>{modal&&<DocumentModal record={modal} close={()=>setModal(null)} patientName={patientName}/>}</div>
}

function DocumentModal({record,close,patientName}) {
  const download=()=>{const text=`MediSync Secure Record\n\nPatient: ${patientName}\nID: MS-P-10042\nRecord: ${record.title}\nWatermark: ${patientName} • ${new Date().toLocaleString()}\n\nThis is a simulated secure medical record.`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=`${record.title.replaceAll(' ','-')}-Watermarked.txt`;a.click();};
  return <div className="modal-backdrop"><div className="document-modal"><button className="modal-x" onClick={close}><X size={20}/></button><div className="doc-head"><div className="pdf-icon">PDF</div><div><span>MEDISYNC LABORATORY</span><h2>{record.title}</h2></div></div><div className="doc-watermark">{patientName} • MS-P-10042</div>{record.category==='LAB'?<table><thead><tr><th>Test</th><th>Result</th><th>Normal range</th></tr></thead><tbody><tr><td>Hemoglobin</td><td>14.2 g/dL</td><td>13.0–17.0</td></tr><tr><td>WBC Count</td><td>7.8 ×10³/µL</td><td>4.0–11.0</td></tr><tr><td>Platelets</td><td>260 ×10³/µL</td><td>150–410</td></tr></tbody></table>:<div className="prescription"><h3>Rx</h3><p><b>Tab. Metoprolol 25 mg</b><br/>One tablet once daily • 30 days</p><p><b>Tab. Ecosprin 75 mg</b><br/>One tablet after dinner • 30 days</p><small>Dr. Amit Mishra • Cardiology</small></div>}<button className="btn-primary wide" onClick={download}><Download size={18}/> Download Watermarked PDF</button></div></div>
}

function Billing({state,setState,addAudit}) {
  const [method,setMethod] = useState('UPI'); const [paid,setPaid] = useState(false); const pending = state.invoices.find(i=>i.status==='Pending')||state.invoices[0];
  const pay=()=>{setState(s=>({...s,invoices:s.invoices.map(i=>i.status==='Pending'?{...i,status:'Paid'}:i)}));setPaid(true);addAudit(`Processed ₹${pending?.amount||1180} payment via ${method}`)};
  const receipt=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([`MediSync Invoice\n#${pending?.id}\nAmount: ₹${pending?.amount}\nStatus: Paid\nPayment: ${method}`],{type:'text/plain'}));a.download=`MediSync-${pending?.id}-Receipt.txt`;a.click();};
  return <><div className="billing-grid"><article className="checkout-card"><h2>Payment summary</h2><div className="invoice"><span>INVOICE #{pending?.id||'—'}</span><h3>{pending?.title||'Cardiology Consultation'}</h3><p>{pending?.doctor||'Dr. Amit Mishra'}</p><div className="invoice-row"><span>Consultation</span><b>₹1,000</b></div><div className="invoice-row"><span>GST</span><b>₹180</b></div><hr/><div className="invoice-total"><span>Total</span><b>₹{(pending?.amount||1180).toLocaleString('en-IN')}</b></div></div></article><article className="checkout-card"><h2>Choose payment method</h2><div className="payment-options">{['UPI','Credit / Debit','Net Banking'].map(m=><button className={method===m?'selected':''} key={m} onClick={()=>setMethod(m)}><i/><span>{m}</span>{m==='UPI'&&<CreditCard size={20}/>}</button>)}</div>{method==='UPI'?<input className="upi-input" defaultValue="amit@upi"/>:method==='Credit / Debit'?<input className="upi-input" placeholder="Card number •••• ••••"/>:<select className="upi-input"><option>HDFC Bank</option><option>ICICI Bank</option><option>SBI</option></select>}<button className="btn-primary wide" onClick={pay}>{paid?'Paid successfully':'Pay ₹'+(pending?.amount||1180).toLocaleString('en-IN')}</button>{paid&&<button className="receipt" onClick={receipt}><Download size={16}/> Download invoice receipt</button>}</article></div><div className="section-card tracking"><div className="section-heading"><h2>Payment tracking & refunds</h2></div><table><thead><tr><th>Invoice</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>{state.invoices.map(i=><tr key={i.id}><td>{i.id}</td><td>₹{i.amount.toLocaleString('en-IN')}</td><td><span className={`status ${i.status.toLowerCase()}`}>{i.status}</span></td><td><button onClick={()=>alert('Refund request submitted for policy review')}>Request refund</button></td></tr>)}</tbody></table></div></>
}

function Doctor({state,setState,section,addAudit}) {
  const [selected,setSelected]=useState('Amit Mishra'); const [rx,setRx]=useState('');
  if(section==='Prescriptions') return <><PortalHeader title="Prescription Builder"/><div className="section-card"><div className="section-heading"><h2>Issue new prescription</h2><span className="role-badge-inline"><ShieldCheck size={14}/> Published securely</span></div><div className="rx-form"><label>Patient<select value={selected} onChange={e=>setSelected(e.target.value)}><option>Amit Mishra</option><option>Neha Kapoor</option><option>Rahul Verma</option></select></label><label>Medication<input value={rx} onChange={e=>setRx(e.target.value)} placeholder="e.g. Tab. Metoprolol 25 mg"/></label><label>Dosage & frequency<input defaultValue="Once daily for 30 days"/></label><label>Clinical notes<textarea defaultValue="Continue monitoring blood pressure."/></label><button className="btn-primary" onClick={()=>{if(!rx.trim())return alert('Enter a medication name');setState(s=>({...s,records:[{id:Date.now(),title:`Prescription — ${rx}`,meta:`Dr. Amit Mishra • ${new Date().toLocaleDateString('en-GB')}`,category:'RX'},...s.records]}));addAudit(`Issued prescription for ${selected}`);setRx('');alert('Prescription published to patient records')}}><Plus size={17}/> Issue Prescription</button></div></div></>;
  if(section==='Lab & Imaging') return <><PortalHeader title="Lab & Imaging"/><div className="section-card"><div className="section-heading"><h2>Review queue</h2></div>{state.records.filter(r=>r.category==='LAB').map(r=><div className="review-row" key={r.id}><div className="pdf-icon">PDF</div><div><h3>{r.title}</h3><p>{r.meta}</p></div><textarea defaultValue="Findings reviewed. Values within normal clinical range."/><button className="btn-primary" onClick={()=>addAudit(`Approved and released ${r.title}`)}>Approve & Release</button></div>)}</div></>;
  if(section==='Patient History') return <><PortalHeader title="Patient History"/><div className="section-card"><div className="section-heading"><h2>{selected}</h2><select value={selected} onChange={e=>setSelected(e.target.value)}><option>Amit Mishra</option><option>Neha Kapoor</option><option>Rahul Verma</option></select></div><div className="timeline"><div><b>28 Sep 2026</b><h3>Cardiology review</h3><p>Vitals: BP 118/76 • HR 72 bpm • ECG normal</p></div><div><b>21 Sep 2026</b><h3>ECG & laboratory workup</h3><p>ECG and blood panel added to records vault</p></div><div><b>08 Aug 2026</b><h3>General consultation</h3><p>Routine physical examination completed</p></div></div></div></>;
  return <><PortalHeader title="Today's Schedule"/><div className="doctor-grid"><div className="section-card schedule"><div className="section-heading"><h2>Daily schedule</h2><span className="role-badge-inline">3 appointments</span></div>{[...state.appointments,{id:2,patient:'Neha Kapoor',doctor:'Dr. Amit Mishra',specialty:'Cardiology',time:'12:00 PM',status:'Waiting',room:'101'},{id:3,patient:'Rahul Verma',doctor:'Dr. Amit Mishra',specialty:'Cardiology',time:'03:30 PM',status:'Completed',room:'101'}].map((a,i)=><div className="schedule-row" key={a.id||i}><div><b>{a.time}</b><small>Room {a.room||'101'}</small></div><div><h3>{a.patient}</h3><p>{a.specialty}</p></div><span className={`status ${a.status==='Waiting'?'pending':'paid'}`}>{a.status==='Confirmed'?'Waiting':a.status}</span><button onClick={()=>addAudit(`Started consultation for ${a.patient}`)}>Start consultation</button></div>)}</div><div className="section-card doctor-summary"><span className="card-label">PATIENT LOAD</span><strong>12</strong><p>Appointments this week</p><div className="mini-chart"><i/><i/><i/><i/><i/><i/></div></div></div></>;
}

function Admin({state,setState,section,addAudit}) {
  if(section==='Audit Logs') return <><PortalHeader title="System Audit Logs"/><div className="section-card"><div className="section-heading"><h2>Security & operations log</h2><div className="search-box"><Search size={16}/><input placeholder="Search actions"/></div></div><table><thead><tr><th>Timestamp</th><th>User / Role</th><th>Action</th><th>Security</th></tr></thead><tbody>{state.audit.map((a,i)=><tr key={i}><td>{a.time}</td><td><b>{a.user}</b><br/><small>{a.role}</small></td><td>{a.action}</td><td><span className="ready"><ShieldCheck size={12}/> {a.security}</span></td></tr>)}</tbody></table></div></>;
  if(section==='Walk-ins') return <><PortalHeader title="Walk-ins & Overrides"/><div className="section-card"><div className="section-heading"><h2>Register walk-in</h2></div><div className="walkin-form"><input defaultValue="Patient name"/><select><option>Cardiology</option><option>General Medicine</option><option>Orthopedics</option></select><select><option>Room 101 — Dr. Amit Mishra</option><option>Room 102 — Dr. Riya Sharma</option></select><button className="btn-primary" onClick={()=>addAudit('Registered a walk-in patient and assigned a room')}><Plus size={17}/> Register patient</button></div></div></>;
  if(section==='Billing Reconciliation') return <><PortalHeader title="Billing Reconciliation"/><div className="stats"><Stat label="Today's collections" value="₹48,620" tone="teal"/><Stat label="UPI" value="₹28,400" tone="blue"/><Stat label="Pending invoices" value={String(state.invoices.filter(i=>i.status==='Pending').length)} tone="amber"/></div><div className="section-card"><div className="section-heading"><h2>Refund queue</h2></div><table><thead><tr><th>Invoice</th><th>Patient</th><th>Reason</th><th>Action</th></tr></thead><tbody><tr><td>MS-2026-1038</td><td>Neha Kapoor</td><td>Appointment cancelled</td><td><button onClick={()=>addAudit('Approved patient refund')}>Approve</button><button onClick={()=>addAudit('Rejected patient refund')}>Reject</button></td></tr></tbody></table></div></>;
  return <><PortalHeader title="Clinic Operations"/><div className="rooms-grid">{state.rooms.map((room,i)=><article className="room-card" key={room.id}><div className="room-top"><span>ROOM {room.id}</span><button onClick={()=>setState(s=>({...s,rooms:s.rooms.map(r=>r.id===room.id?{...r,status:r.status==='Available'?'Occupied':'Available'}:r)}))}>{room.status}</button></div><h3>{room.name}</h3><p>{room.doctor}</p><small>{room.status==='Available'?'Ready for assignment':room.status==='Occupied'?'Consultation in progress':'Under maintenance'}</small></article>)}</div><div className="section-card"><div className="section-heading"><h2>Live operations</h2><span className="ready"><CircleCheck size={13}/> Systems operational</span></div><div className="operations"><div><strong>18</strong><span>Appointments today</span></div><div><strong>6</strong><span>Patients waiting</span></div><div><strong>3</strong><span>Rooms occupied</span></div></div></div></>;
}

function App(){
  const [screen,setScreen]=useState('landing');
  const [role,setRole]=useState('Patient');
  const [userName,setUserName]=useState('Amit Mishra');
  if(screen==='register') return <RegistrationPage back={()=>setScreen('landing')}/>;
  return screen==='landing'
    ? <Landing register={()=>setScreen('register')} enter={(selectedRole,accountName)=>{setRole(selectedRole);setUserName(accountName||nameFromEmail('portal.user@example.com'));setScreen('portal')}}/>
    : <Portal role={role} setRole={setRole} setLanding={()=>setScreen('landing')} userName={userName}/>;
}
createRoot(document.getElementById('root')).render(<App/>);
