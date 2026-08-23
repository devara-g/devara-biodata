import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/devara-g/repos?sort=updated&per_page=30",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Devara-Portfolio-App",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repositories from GitHub" },
        { status: res.status }
      );
    }

    const rawRepos = await res.json();

    // Filter out profile readme repository ('devara-g') if desired or keep all
    const formattedRepos = rawRepos
      .filter((repo: any) => repo.name !== "devara-g")
      .map((repo: any) => {
        // Human-readable title
        const formattedTitle = repo.name
          .replace(/-/g, " ")
          .replace(/_/g, " ")
          .toUpperCase();

        // Default friendly descriptions if repo.description is null
        let description = repo.description;
        if (!description) {
          if (repo.name.includes("midtrans")) {
            description = "Sistem integrasi Payment Gateway Midtrans dengan verifikasi transaksi webhook otomatis.";
          } else if (repo.name.includes("uang-kas")) {
            description = "Aplikasi manajemen kas digital dan pencatatan keuangan real-time.";
          } else if (repo.name.includes("casmart")) {
            description = "Platform e-commerce & kasir pintar dengan sistem inventori barang.";
          } else if (repo.name.includes("voice")) {
            description = "Aplikasi pemrosesan suara dan audio berbasis web modern.";
          } else if (repo.name.includes("chronicle")) {
            description = "Platform catatan timeline dan dokumentasi sistem terdistribusi.";
          } else if (repo.name.includes("exam")) {
            description = "Platform sistem ujian online (CBT) dengan kontrol integritas data.";
          } else {
            description = `Proyek repositori open-source dibangun menggunakan ${repo.language || "TypeScript / JavaScript"}.`;
          }
        }

        // Tags
        const tags = [
          repo.language,
          ...(repo.topics || []),
          repo.homepage ? "Live Deployed" : "Open Source",
        ].filter(Boolean);

        return {
          id: repo.id.toString(),
          name: repo.name,
          title: formattedTitle,
          description,
          language: repo.language || "TypeScript",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || repo.html_url,
          hasLiveDemo: Boolean(repo.homepage),
          updatedAt: new Date(repo.updated_at).toLocaleDateString("id-ID", {
            month: "short",
            year: "numeric",
          }),
          tags,
        };
      });

    return NextResponse.json({ repos: formattedRepos, count: formattedRepos.length });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
