import EditForm from '@/app/ui/users/edit-form';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';
 
export default async function Page({ params }: { params: { uuid: string } }) {
  const id = params.uuid;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}