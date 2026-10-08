// Landing page NUSAAPP, aplikasi kasir untuk UMKM.
// Halaman ini TIDAK memakai AuthenticatedLayout, header/nav + footer inline, self-contained.
// Tidak menerima props.
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';
import { StatCounter } from '@/components/stat-counter';
import {
    BarChart3,
    Bell,
    CheckCircle2,
    Cloud,
    Menu,
    Printer,
    QrCode,
    Receipt,
    ScanLine,
    Smartphone,
    Star,
    Store,
    Users,
    Wallet,
    X,
    type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Format rupiah gaya Indonesia: 99000 -> "Rp99.000"
const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

// ---------- Data ----------

interface Fitur {
    nama: string;
    deskripsi: string;
    icon: LucideIcon;
}

const FITUR: Fitur[] = [
    { nama: 'Kasir Kilat', deskripsi: 'Transaksi selesai dalam 10 detik. Scan barcode atau pilih produk dari katalog bergambar.', icon: ScanLine },
    { nama: 'QRIS Terintegrasi', deskripsi: 'Terima pembayaran QRIS, e-wallet, dan tunai, semua tercatat otomatis dalam satu laporan.', icon: QrCode },
    { nama: 'Stok Real-Time', deskripsi: 'Stok berkurang otomatis setiap transaksi. Dapat notifikasi saat produk hampir habis.', icon: Bell },
    { nama: 'Laporan Harian', deskripsi: 'Omzet, produk terlaris, dan jam ramai, tersaji dalam grafik yang mudah dibaca.', icon: BarChart3 },
    { nama: 'Multi Kasir & Cabang', deskripsi: 'Kelola banyak kasir dan cabang dari satu akun. Atur hak akses per karyawan.', icon: Users },
    { nama: 'Cetak Struk Bluetooth', deskripsi: 'Kompatibel dengan printer thermal populer. Struk bisa dikustom dengan logo tokomu.', icon: Printer },
];

const SCREENSHOTS = [
    { judul: 'Kasir 10 detik', deskripsi: 'Scan barcode, terima QRIS, struk tercetak, tanpa antre.', foto: '/images/landing-app/tampilan-kasir.jpg', anotasi: 'Rata-rata 10 detik/transaksi' },
    { judul: 'Katalog bergambar', deskripsi: 'Tambah produk dengan foto sekali sentuh.', foto: '/images/landing-app/tampilan-katalog.jpg', anotasi: 'Karyawan baru langsung bisa' },
    { judul: 'Laporan terlaris', deskripsi: 'Tahu produk paling laku tiap minggu.', foto: '/images/landing-app/tampilan-laporan.jpg', anotasi: 'Omzet per jam, per kasir' },
];

const PAKET = [
    {
        nama: 'Gratis',
        harga: 0,
        periode: 'selamanya',
        fitur: ['1 perangkat kasir', '100 produk', 'Laporan harian dasar', 'QRIS (fee standar)'],
        cta: 'Unduh Gratis',
        unggulan: false,
    },
    {
        nama: 'Pro',
        harga: 99000,
        periode: '/bulan',
        fitur: ['3 perangkat kasir', 'Produk tanpa batas', 'Laporan lengkap + ekspor', 'Multi cabang & hak akses', 'Dukungan prioritas'],
        cta: 'Coba 14 Hari Gratis',
        unggulan: true,
    },
    {
        nama: 'Bisnis',
        harga: 249000,
        periode: '/bulan',
        fitur: ['10 perangkat kasir', 'Semua fitur Pro', 'API & integrasi akuntansi', 'Manajer akun khusus', 'Pelatihan onboarding'],
        cta: 'Hubungi Sales',
        unggulan: false,
    },
];

const FAQ = [
    {
        q: 'Apakah NusaApp bisa dipakai tanpa internet?',
        a: 'Bisa. Mode offline mencatat semua transaksi di perangkat dan otomatis tersinkron saat koneksi kembali. Data tidak akan hilang.',
    },
    {
        q: 'Perangkat apa saja yang didukung?',
        a: 'Aplikasi Android (versi 8 ke atas) dan iOS (versi 14 ke atas). Untuk printer struk, kami mendukung printer thermal Bluetooth populer seperti XPrinter dan Epson.',
    },
    {
        q: 'Bagaimana cara menerima pembayaran QRIS?',
        a: 'Cukup verifikasi identitas usahamu sekali di aplikasi. QRIS dinamis dibuat otomatis untuk setiap transaksi dan dana masuk ke rekeningmu H+1.',
    },
    {
        q: 'Apakah data penjualan saya aman?',
        a: 'Seluruh data tersimpan di cloud dengan enkripsi dan backup harian. Kamu bisa mengekspor seluruh datamu kapan saja, datamu milikmu.',
    },
    {
        q: 'Bisa pindah dari paket Gratis ke Pro kapan saja?',
        a: 'Bisa, dan semua data serta produkmu ikut terbawa. Upgrade/downgrade berlaku prorata, tanpa biaya admin.',
    },
];

// ---------- Halaman ----------

export default function AppLanding() {
    const [menuBuka, setMenuBuka] = useState(false);

    // Form early-access / demo, tanpa backend, hanya state konfirmasi.
    const [nama, setNama] = useState('');
    const [noHp, setNoHp] = useState('');
    const [demoOk, setDemoOk] = useState(false);

    function kirimDemo(e: FormEvent) {
        e.preventDefault();
        if (!nama.trim() || !noHp.trim()) return;
        setDemoOk(true);
    }

    const scrollKe = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navLinks = [
        { href: '#beranda', label: 'Beranda' },
        { href: '#fitur', label: 'Fitur' },
        { href: '#tampilan', label: 'Tampilan' },
        { href: '#harga', label: 'Harga' },
        { href: '#faq', label: 'FAQ' },
    ];

    return (
        <div className="min-h-screen bg-[#fff8f1] pb-24 text-stone-900 md:pb-0">
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-orange-900/10 bg-[#fff8f1]/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <a href="#beranda" className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600">
                            <Receipt className="h-5 w-5 text-white" />
                        </span>
                        <span className="text-xl font-extrabold tracking-tight">
                            NUSA<span className="text-orange-600">APP</span>
                        </span>
                    </a>
                    <nav className="ml-8 hidden items-center gap-1 md:flex">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-orange-600/5 hover:text-stone-900">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <Button className="ml-auto hidden bg-orange-600 hover:bg-orange-700 sm:inline-flex" onClick={() => scrollKe('unduh')}>
                        Unduh Gratis
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto sm:hidden" onClick={() => setMenuBuka((v) => !v)} aria-label="Menu">
                        {menuBuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                {menuBuka && (
                    <nav className="border-t border-orange-900/10 px-4 py-2 md:hidden">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setMenuBuka(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-orange-600/5">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            {/* Hero, 1 proposisi konkret: tutup buku 15 menit */}
            <section id="beranda" className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-[#ffe9d6] to-amber-100">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(234,88,12,.15) 0, transparent 40%), radial-gradient(circle at 10% 80%, rgba(245,158,11,.12) 0, transparent 40%)' }} aria-hidden />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2">
                    <div>
                        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Tutup buku toko dalam <span className="text-orange-600">15 menit.</span> Bukan 2 jam.
                        </h1>
                        <p className="mt-4 max-w-md text-stone-600">
                            NusaApp mencatat transaksi, mengurangi stok, dan menyusun laporan omzet otomatis,
                            bahkan saat internet mati. Karyawan baru bisa pakai tanpa pelatihan.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" onClick={() => scrollKe('unduh')}>
                                Unduh Sekarang, Gratis
                            </Button>
                            <button onClick={() => scrollKe('tampilan')} className="text-sm font-semibold text-stone-600 underline decoration-orange-400 decoration-2 underline-offset-4 hover:text-stone-900">
                                Lihat tampilannya
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
                            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.8 (12.400+ ulasan)</span>
                            <span className="flex items-center gap-1.5"><Store className="h-4 w-4" /> 85.000+ toko aktif</span>
                            <span className="flex items-center gap-1.5"><Cloud className="h-4 w-4" /> Bisa offline</span>
                        </div>
                    </div>
                    {/* Foto hero: pemilik toko memakai aplikasi kasir */}
                    <div className="relative mx-auto max-w-md">
                        <img
                            src="/images/landing-app/hero.jpg"
                            alt="Pemilik toko menggunakan aplikasi kasir NusaApp di smartphone"
                            className="h-[480px] w-full rounded-[2.5rem] border-[10px] border-stone-900 object-cover shadow-2xl"
                            loading="eager"
                        />
                        <div className="absolute -left-4 top-16 rounded-xl bg-white px-4 py-3 shadow-lg">
                            <p className="text-xs text-stone-500">Omzet hari ini</p>
                            <p className="tnum text-lg font-extrabold text-orange-600">Rp2.847.500</p>
                        </div>
                        <div className="absolute -right-4 bottom-20 rounded-xl bg-white px-4 py-3 shadow-lg">
                            <p className="text-xs text-stone-500">Transaksi terakhir</p>
                            <p className="text-sm font-bold text-stone-900">10 detik · QRIS</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b border-orange-900/10 bg-white">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4">
                    {[
                        { nilai: 85000, suffix: '+', label: 'Toko aktif' },
                        { nilai: 42, suffix: ' jt', prefix: '', label: 'Transaksi / bulan' },
                        { nilai: 98, suffix: '%', label: 'Uptime sinkronisasi' },
                        { nilai: 34, suffix: '', label: 'Provinsi terjangkau' },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="tnum text-3xl font-extrabold text-orange-600">
                                <StatCounter value={s.nilai} suffix={s.suffix} />
                            </p>
                            <p className="mt-1 text-xs text-stone-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fitur */}
            <section id="fitur" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Fitur Unggulan</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Semua yang toko butuhkan, tanpa yang tidak</h2>
                    <p className="mt-2 text-stone-600">Dirancang bersama 500+ pemilik warung, kafe, dan toko kelontong di Indonesia.</p>
                </div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FITUR.map((f) => (
                        <Card key={f.nama} className="transition-shadow hover:shadow-md">
                            <CardContent className="p-5">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                                    <f.icon className="h-5 w-5 text-orange-700" />
                                </span>
                                <p className="mt-3 font-bold">{f.nama}</p>
                                <p className="mt-1 text-sm text-stone-600">{f.deskripsi}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Screenshot beranotasi */}
            <section id="tampilan" className="scroll-mt-16 bg-stone-950 py-14 text-white">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">Intip Aplikasinya</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Tiga layar yang dipakai setiap hari</h2>
                        <p className="mt-2 text-sm text-stone-400">Bersih, cepat, dan mudah dipahami, tanpa perlu pelatihan khusus.</p>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {SCREENSHOTS.map((s, i) => (
                            <div key={s.judul} className="relative overflow-hidden rounded-2xl border border-white/10 bg-stone-900">
                                <div className="relative">
                                    <img src={s.foto} alt={s.judul} className="h-56 w-full object-cover" loading="lazy" />
                                    <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">
                                        {s.anotasi}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <p className="font-bold"><span className="mr-2 text-orange-400">{i + 1}.</span>{s.judul}</p>
                                    <p className="mt-1 text-sm text-stone-400">{s.deskripsi}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Harga */}
            <section id="harga" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Harga</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Mulai gratis, naik saat siap</h2>
                    <p className="mx-auto mt-2 max-w-lg text-stone-600">Tanpa kartu kredit untuk paket gratis. Batalkan kapan saja.</p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {PAKET.map((p) => (
                        <Card key={p.nama} className={cn('relative flex flex-col transition-shadow hover:shadow-lg', p.unggulan && 'border-orange-600 shadow-md ring-2 ring-orange-600/20')}>
                            {p.unggulan && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 hover:bg-orange-600">Paling Populer, 8 dari 10 toko</Badge>}
                            <CardHeader>
                                <CardTitle className="text-xl">{p.nama}</CardTitle>
                                <p className="mt-1">
                                    <span className="tnum text-3xl font-extrabold text-orange-700">{p.harga === 0 ? 'Gratis' : rupiah(p.harga)}</span>
                                    <span className="text-sm text-stone-500">{p.harga === 0 ? '' : p.periode}</span>
                                </p>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col">
                                <ul className="flex-1 space-y-2 text-sm text-stone-700">
                                    {p.fitur.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button className={cn('mt-5 w-full', p.unggulan ? 'bg-orange-600 hover:bg-orange-700' : '')} variant={p.unggulan ? 'default' : 'outline'} onClick={() => scrollKe('unduh')}>
                                    {p.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Unduh + form demo + testimoni teratribusi */}
            <section id="unduh" className="scroll-mt-16 bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 py-14 text-white">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-3xl font-extrabold tracking-tight">Unduh NusaApp Sekarang</h2>
                        <p className="mt-2 max-w-md text-sm text-orange-100">
                            Gratis untuk memulai. Butuh pendampingan setup toko? Tinggalkan nomor WhatsApp,
                            tim kami akan menghubungimu untuk demo 15 menit.
                        </p>
                        <blockquote className="mt-6 max-w-md rounded-2xl bg-white/10 p-5 backdrop-blur">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
                                ))}
                            </div>
                            <p className="mt-2 text-sm italic text-white">
                                "Dulu tutup buku jam 10 malam, sekarang jam 8 sudah beres. Stok juga nggak pernah
                                selisih lagi sejak pakai NusaApp."
                            </p>
                            <footer className="mt-2 text-xs text-orange-100">
                                <span className="font-semibold text-white">Budi Hartono</span>, pemilik Warung Bu Tini, Depok ·
                                pakai NusaApp sejak Januari 2026
                            </footer>
                        </blockquote>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Minta Demo Gratis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {demoOk ? (
                                <div className="rounded-xl bg-green-50 p-6 text-center">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                                    <p className="mt-3 text-lg font-bold text-green-800">Siap!</p>
                                    <p className="mt-1 text-sm text-green-700">
                                        Terima kasih, <span className="font-semibold">{nama}</span>. Tim kami akan menghubungimu
                                        di {noHp} untuk menjadwalkan demo 15 menit.
                                    </p>
                                    <Button variant="outline" className="mt-4" onClick={() => { setDemoOk(false); setNama(''); setNoHp(''); }}>
                                        Minta demo lain
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={kirimDemo} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="na-nama">Nama</Label>
                                        <Input id="na-nama" placeholder="Nama pemilik usaha" value={nama} onChange={(e) => setNama(e.target.value)} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="na-hp">Nomor WhatsApp</Label>
                                        <Input id="na-hp" placeholder="cth: 081234567890" inputMode="tel" value={noHp} onChange={(e) => setNoHp(e.target.value)} required />
                                    </div>
                                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">Minta Demo 15 Menit</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">FAQ</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Pertanyaan Umum</h2>
                </div>
                <Accordion type="single" collapsible className="mt-8">
                    {FAQ.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                            <AccordionContent className="text-stone-600">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600">
                                <Receipt className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-lg font-extrabold text-white">NUSA<span className="text-orange-400">APP</span></span>
                        </div>
                        <p className="mt-3 text-sm">Aplikasi kasir untuk UMKM Indonesia. Mudah, cepat, terjangkau.</p>
                    </div>
                    <div>
                        <p className="flex items-center gap-2 font-semibold text-white"><Smartphone className="h-4 w-4" /> Unduh</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li>App Store (iOS)</li>
                            <li>Google Play (Android)</li>
                        </ul>
                    </div>
                    <div>
                        <p className="flex items-center gap-2 font-semibold text-white"><Wallet className="h-4 w-4" /> Bantuan</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li>Pusat bantuan</li>
                            <li>0812-3456-7890</li>
                            <li>halo@nusaapp.id</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-stone-800 py-4 text-center text-xs">© 2026 NusaApp. Dibuat dengan bangga di Indonesia.</div>
            </footer>

            {/* CTA sticky mobile */}
            <StickyMobileCta
                variant="cart"
                title="NusaApp"
                subtitle="Gratis untuk memulai"
                actionLabel="Unduh Aplikasi"
                onAction={() => document.getElementById('unduh')?.scrollIntoView({ behavior: 'smooth' })}
            />
        </div>
    );
}
