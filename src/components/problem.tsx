import { Container } from "@/components/container"

export function Problem() {
  return (
    <section className="bg-paper py-20 text-navy sm:py-28">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
              The missed moment
            </p>
            <h2 className="display mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.1rem]">
              Your business is busy.
              <span className="serif-em mt-2 block text-[0.92em]">
                Your opportunities shouldn&apos;t wait.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-quiet lg:col-span-5 lg:col-start-8">
            When your team is focused on the customer in front of them, the next inquiry still needs somewhere to go.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <article className="relative overflow-hidden bg-navy px-6 py-8 text-ivory sm:px-8 sm:py-10 lg:col-span-7">
            <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
              01 — Incoming call
            </p>
            <h3 className="display mt-6 max-w-md text-4xl sm:text-5xl">
              The line rings.
              <span className="serif-em block text-gold">Nobody is free.</span>
            </h3>
            <div className="mt-8 flex items-end gap-[3px]" aria-hidden="true">
              {Array.from({ length: 28 }, (_, index) => (
                <span
                  key={index}
                  className="w-[3px] bg-gold/70"
                  style={{ height: index > 18 ? 6 : 8 + ((index * 9) % 22) }}
                />
              ))}
            </div>
            <p className="mt-6 max-w-sm text-sm leading-6 text-silver">
              An incoming call goes unanswered. The person who would pick up is
              already with someone else.
            </p>
          </article>

          <div className="grid gap-4 lg:col-span-5">
            <article className="border border-navy/10 bg-ivory px-6 py-7">
              <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold-ink uppercase">
                02 — A lead waits
              </p>
              <h3 className="mt-4 font-heading text-2xl tracking-[-0.03em]">
                The reply never leaves the inbox.
              </h3>
              <div className="mt-6 border-t border-navy/10 pt-4">
                <div className="flex items-center justify-between text-xs tracking-[0.14em] text-quiet uppercase">
                  <span>New inquiry</span>
                  <span>Still waiting</span>
                </div>
                <div className="mt-3 h-px bg-navy/15">
                  <div className="h-px w-1/3 bg-gold" />
                </div>
                <p className="mt-4 text-sm leading-6 text-quiet">
                  A lead waits for a reply. By the end of the day, the
                  conversation has cooled.
                </p>
              </div>
            </article>
            <article className="border border-navy/10 px-6 py-7">
              <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold-ink uppercase">
                03 — A visitor leaves
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  ["Arrive", "The page loads"],
                  ["Question", "Nothing answers"],
                  ["Leave", "No request is made"],
                ].map(([label, note], index) => (
                  <li key={label} className="grid grid-cols-[1.5rem_1fr] gap-3">
                    <span
                      className={`mt-1 size-2 ${index === 2 ? "bg-transparent ring-1 ring-gold" : "bg-navy"}`}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-heading text-lg tracking-[-0.03em]">
                        {label}
                      </span>
                      <span className="text-sm text-quiet">{note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>

        <div className="mt-14 border-t border-navy/10 pt-8">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-gold-ink uppercase">
            The bridge
          </p>
          <p className="display mt-4 max-w-4xl text-4xl sm:text-5xl">
            VONTE connects the moments that matter.
          </p>
        </div>
      </Container>
    </section>
  )
}
