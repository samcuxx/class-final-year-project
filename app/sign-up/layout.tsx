export default async function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      {children}
    </div>
  );
} 