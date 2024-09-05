import Breadcrumbs from '@/app/ui/roles/breadcrumbs';
import CreateForm from '@/app/ui/roles/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Roles', href: '/dashboard/roles' },
          {
            label: 'Add Roles',
            href: '/dashboard/roles/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}