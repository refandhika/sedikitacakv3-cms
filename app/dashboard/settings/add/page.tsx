import Breadcrumbs from '@/app/ui/settings/breadcrumbs';
import CreateForm from '@/app/ui/settings/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Settings', href: '/dashboard/settings' },
          {
            label: 'Add Setting',
            href: '/dashboard/settings/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}