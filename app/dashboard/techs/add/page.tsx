import Breadcrumbs from '@/app/ui/techs/breadcrumbs';
import CreateForm from '@/app/ui/techs/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Techs', href: '/dashboard/techs' },
          {
            label: 'Add Tech',
            href: '/dashboard/techs/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}