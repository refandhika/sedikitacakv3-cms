import Breadcrumbs from '@/app/ui/users/breadcrumbs';
import CreateForm from '@/app/ui/users/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Add User',
            href: '/dashboard/users/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}