"use client";

import { useAuth } from "@/components/providers/auth-provider";

export default function ProfilePage() {
  const { user, isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <main className="page justify-center">
        <section className="page-narrow surface stack">
          <h1>Загрузка...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="page justify-center">
      <section className="page-narrow surface stack">
        <h1>Профиль пользователя</h1>
        {isAuthenticated && user ? (
          <>
            <p>Email: {user.email}</p>
            <p>
              Имя: {[user.first_name, user.last_name].filter(Boolean).join(" ") || "Не указано"}
            </p>
          </>
        ) : (
          <p>Вы не авторизованы.</p>
        )}
      </section>
    </main>
  );
}
