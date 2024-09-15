import EditForm from '@/app/ui/techs/edit-form';
import Breadcrumbs from '@/app/ui/techs/breadcrumbs';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Techs', href: '/dashboard/techs' },
          {
            label: 'Edit Tech',
            href: `/dashboard/techs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}